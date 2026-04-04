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

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string" || question.trim().length < 3) {
      return NextResponse.json({ error: "Scrivi una domanda" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: question.trim() },
    ]);

    const answer = result.response.text();

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Non riesco a rispondere in questo momento. Riprova tra poco." },
      { status: 500 }
    );
  }
}
