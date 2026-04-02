import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email richiesta" }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from("leads_karica")
      .insert({ name: name || null, email, source: "funding" });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Errore nel salvataggio" }, { status: 500 });
    }

    // Send notification email
    try {
      await resend.emails.send({
        from: "Karica <noreply@mail.karica.it>",
        to: process.env.NOTIFICATION_EMAIL!,
        subject: `Nuovo lead funding: ${name || "Senza nome"} (${email})`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px;">
            <h2 style="color: #39FF14;">Nuovo lead dal sito Karica</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Nome</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${name || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Pagina</td>
                <td style="padding: 8px;">Funding (/funding)</td>
              </tr>
            </table>
            <p style="color: #888; font-size: 12px; margin-top: 16px;">
              Inviare il pitch deck a ${email}
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      // Log but don't fail — the lead is saved
      console.error("Email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Errore del server" }, { status: 500 });
  }
}
