import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `Sei l'assistente energetico di Karica, una startup innovativa italiana che aiuta famiglie e imprese a risparmiare sull'energia.

Rispondi SOLO a domande su:
- Bollette, consumi, risparmio energetico
- Incentivi (Ecobonus, Conto Termico, bonus ristrutturazione)
- Fotovoltaico, pompe di calore, cappotto termico, infissi
- Comunità Energetiche Rinnovabili (CER)
- Direttiva Case Green (EPBD)
- Classi energetiche degli edifici
- Finanziamenti green

Regole:
- Rispondi in italiano, in modo semplice e diretto
- Massimo 3-4 frasi, sii conciso
- Se la domanda è un follow-up, sfrutta il contesto della conversazione precedente
- Se non sai qualcosa, dillo onestamente
- Se la domanda non riguarda l'energia o la casa, rispondi gentilmente che puoi aiutare solo su temi energetici
- Non inventare numeri o percentuali se non sei sicuro
- Alla fine di ogni risposta, se pertinente, suggerisci di esplorare il sito Karica per approfondire`;

const MODEL_NAME = "gemini-2.5-flash";
const MAX_RETRIES = 2;
const BASE_RETRY_DELAY_MS = 600;
const REQUEST_TIMEOUT_MS = 20_000;
const MIN_QUESTION_LEN = 3;
const MAX_QUESTION_LEN = 500;
const MAX_HISTORY_MESSAGES = 20; // Hard cap to prevent runaway conversations / cost

// --- In-memory cache ---------------------------------------------------------
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const CACHE_MAX_ENTRIES = 200;
const cache = new Map<string, { answer: string; expiresAt: number }>();

function getCached(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.answer;
}

function setCached(key: string, answer: string) {
  if (cache.size >= CACHE_MAX_ENTRIES) {
    const firstKey = cache.keys().next().value;
    if (firstKey !== undefined) cache.delete(firstKey);
  }
  cache.set(key, { answer, expiresAt: Date.now() + CACHE_TTL_MS });
}

// --- Error classification ----------------------------------------------------
type ErrorShape = { status?: number; message?: string; code?: number };

function inferStatus(error: unknown): number {
  if (!error || typeof error !== "object") return 500;
  const err = error as ErrorShape;
  if (typeof err.status === "number") return err.status;
  if (typeof err.code === "number") return err.code;
  const msg = (err.message || "").toLowerCase();
  if (msg.includes("429") || msg.includes("rate") || msg.includes("quota")) return 429;
  if (msg.includes("timeout") || msg.includes("deadline")) return 504;
  if (msg.includes("safety") || msg.includes("blocked")) return 422;
  return 500;
}

function isRetryable(status: number): boolean {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function userFacingMessage(status: number): string {
  if (status === 429) return "Troppe domande di fila — riprova tra qualche secondo.";
  if (status === 422) return "Non riesco a rispondere a questa — prova a riformularla.";
  if (status === 504) return "La risposta sta tardando troppo. Riprova.";
  if (status === 400) return "Scrivi una domanda di almeno 3 caratteri.";
  return "Non riesco a rispondere in questo momento. Riprova tra poco.";
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(Object.assign(new Error("timeout"), { status: 504 })),
        ms,
      ),
    ),
  ]);
}

// --- Message validation ------------------------------------------------------
type Role = "user" | "assistant";
type ApiMessage = { role: Role; content: string };

function validateMessages(input: unknown): { messages: ApiMessage[]; error?: string } {
  if (!Array.isArray(input) || input.length === 0) {
    return { messages: [], error: "Formato messaggi non valido" };
  }
  if (input.length > MAX_HISTORY_MESSAGES) {
    return { messages: [], error: "Conversazione troppo lunga, ricominciane una nuova" };
  }

  const out: ApiMessage[] = [];
  for (const m of input) {
    if (!m || typeof m !== "object") return { messages: [], error: "Formato messaggi non valido" };
    const raw = m as { role?: unknown; content?: unknown };
    if (raw.role !== "user" && raw.role !== "assistant") {
      return { messages: [], error: "Ruolo messaggio non valido" };
    }
    if (typeof raw.content !== "string") {
      return { messages: [], error: "Contenuto messaggio non valido" };
    }
    const trimmed = raw.content.trim();
    if (trimmed.length === 0) {
      return { messages: [], error: "Messaggio vuoto" };
    }
    if (trimmed.length > MAX_QUESTION_LEN) {
      return { messages: [], error: `Messaggio troppo lungo (max ${MAX_QUESTION_LEN} caratteri)` };
    }
    out.push({ role: raw.role, content: trimmed });
  }

  // Last message must be from user — that's the new question we're answering
  if (out[out.length - 1].role !== "user") {
    return { messages: [], error: "L'ultimo messaggio deve essere una domanda dell'utente" };
  }

  // First user message must meet minimum length
  const firstUser = out.find((m) => m.role === "user");
  if (firstUser && firstUser.content.length < MIN_QUESTION_LEN) {
    return { messages: [], error: `Scrivi una domanda di almeno ${MIN_QUESTION_LEN} caratteri` };
  }

  return { messages: out };
}

// --- Gemini call with retry --------------------------------------------------
async function generateAnswer(messages: ApiMessage[]): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 400,
    },
  });

  // All messages except the last become chat history; the last is the new prompt
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: m.content }],
  }));
  const latest = messages[messages.length - 1].content;

  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const chat = model.startChat({ history });
      const result = await withTimeout(
        chat.sendMessage(latest),
        REQUEST_TIMEOUT_MS,
      );
      return result.response.text();
    } catch (error) {
      lastError = error;
      const status = inferStatus(error);
      if (attempt >= MAX_RETRIES || !isRetryable(status)) {
        throw error;
      }
      const delay = BASE_RETRY_DELAY_MS * Math.pow(3, attempt);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}

// --- Route handler -----------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Accept two shapes for backwards compatibility:
    // - { messages: [{role, content}, ...] }  (new, threaded)
    // - { question: "..." }                    (legacy, single-turn)
    let messages: ApiMessage[];
    if (Array.isArray(body?.messages)) {
      const result = validateMessages(body.messages);
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      messages = result.messages;
    } else if (typeof body?.question === "string") {
      const q = body.question.trim();
      if (q.length < MIN_QUESTION_LEN) {
        return NextResponse.json(
          { error: `Scrivi una domanda di almeno ${MIN_QUESTION_LEN} caratteri` },
          { status: 400 },
        );
      }
      if (q.length > MAX_QUESTION_LEN) {
        return NextResponse.json(
          { error: `La domanda è troppo lunga (max ${MAX_QUESTION_LEN} caratteri)` },
          { status: 400 },
        );
      }
      messages = [{ role: "user", content: q }];
    } else {
      return NextResponse.json(
        { error: "Formato richiesta non valido" },
        { status: 400 },
      );
    }

    // Cache key = normalized full conversation. First-turn identical questions
    // (the suggestion pills) still hit cache; multi-turn conversations rarely
    // collide, which is fine.
    const cacheKey = messages
      .map((m) => `${m.role}:${m.content.toLowerCase().replace(/\s+/g, " ")}`)
      .join("|");
    const cached = getCached(cacheKey);
    if (cached) {
      return NextResponse.json({ answer: cached, cached: true });
    }

    const answer = await generateAnswer(messages);
    setCached(cacheKey, answer);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Gemini error:", error);
    const status = inferStatus(error);
    return NextResponse.json(
      { error: userFacingMessage(status) },
      { status },
    );
  }
}
