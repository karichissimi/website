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

// In-memory cache for identical questions (especially the suggestion pills),
// so we don't re-hit Gemini for the same query within the TTL window.
// Module-level cache persists across requests inside the same serverless
// instance — it won't cross instances, but that's fine for coarse rate relief.
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
    // Drop oldest entry (insertion order)
    const firstKey = cache.keys().next().value;
    if (firstKey !== undefined) cache.delete(firstKey);
  }
  cache.set(key, { answer, expiresAt: Date.now() + CACHE_TTL_MS });
}

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
  // Retry: timeouts, gateway errors, generic 500, rate-limits (after backoff)
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function userFacingMessage(status: number): string {
  if (status === 429) return "Troppe domande di fila — riprova tra qualche secondo.";
  if (status === 422) return "La domanda non può essere elaborata — prova a riformularla.";
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

async function generateAnswer(question: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 400,
    },
  });

  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await withTimeout(
        model.generateContent([
          { text: SYSTEM_PROMPT },
          { text: question },
        ]),
        REQUEST_TIMEOUT_MS,
      );
      return result.response.text();
    } catch (error) {
      lastError = error;
      const status = inferStatus(error);
      if (attempt >= MAX_RETRIES || !isRetryable(status)) {
        throw error;
      }
      // Exponential backoff: 600ms, 1800ms
      const delay = BASE_RETRY_DELAY_MS * Math.pow(3, attempt);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Scrivi una domanda" },
        { status: 400 },
      );
    }

    const trimmed = question.trim();
    if (trimmed.length < MIN_QUESTION_LEN) {
      return NextResponse.json(
        { error: `Scrivi una domanda di almeno ${MIN_QUESTION_LEN} caratteri` },
        { status: 400 },
      );
    }
    if (trimmed.length > MAX_QUESTION_LEN) {
      return NextResponse.json(
        { error: `La domanda è troppo lunga (max ${MAX_QUESTION_LEN} caratteri)` },
        { status: 400 },
      );
    }

    // Cache lookup — case-insensitive, whitespace-normalized key
    const cacheKey = trimmed.toLowerCase().replace(/\s+/g, " ");
    const cached = getCached(cacheKey);
    if (cached) {
      return NextResponse.json({ answer: cached, cached: true });
    }

    const answer = await generateAnswer(trimmed);
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
