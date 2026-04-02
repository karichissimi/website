import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function confirmationEmail(name: string) {
  const firstName = name ? name.split(" ")[0] : "";
  const greeting = firstName ? `Ciao ${firstName},` : "Ciao,";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <div style="max-width: 480px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #ffffff; border-radius: 8px; padding: 40px 32px;">

      <img src="https://karica.it/graphics/Karica_Scritta_BLU.png" alt="Karica" height="28" style="display: block; margin-bottom: 32px;" />

      <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        ${greeting}
      </p>

      <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        grazie per il tuo interesse in Karica. Abbiamo ricevuto la tua richiesta e ti invieremo il pitch deck completo nelle prossime ore.
      </p>

      <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 32px;">
        Se hai domande, rispondi direttamente a questa email.
      </p>

      <div style="border-top: 1px solid #eee; padding-top: 24px; margin-top: 8px;">
        <p style="color: #888; font-size: 13px; line-height: 1.6; margin: 0 0 16px;">
          Conosci qualcuno a cui potrebbe interessare? Condividi il link:
        </p>
        <a href="https://karica.it/funding" style="color: #1a7a3a; font-size: 13px; font-weight: 600; text-decoration: none;">
          karica.it/funding &rarr;
        </a>
      </div>

    </div>

    <p style="color: #aaa; font-size: 11px; line-height: 1.5; margin: 24px 0 0; text-align: center;">
      Karica S.r.l. — Startup Innovativa — Milano
    </p>
  </div>
</body>
</html>`;
}

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

    // Send emails (both in parallel, neither blocks the response on failure)
    try {
      await Promise.all([
        // Notification to team
        resend.emails.send({
          from: "Karica <noreply@mail.karica.it>",
          replyTo: email,
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
              </table>
              <p style="color: #888; font-size: 12px; margin-top: 16px;">
                Inviare il pitch deck a ${email}
              </p>
            </div>
          `,
        }),
        // Confirmation to lead
        resend.emails.send({
          from: "Karica <noreply@mail.karica.it>",
          replyTo: "alessandro.zanin@karica.it",
          to: email,
          subject: "Grazie per il tuo interesse in Karica",
          html: confirmationEmail(name || ""),
        }),
      ]);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Errore del server" }, { status: 500 });
  }
}
