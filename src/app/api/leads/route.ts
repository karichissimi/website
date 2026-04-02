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
<body style="margin: 0; padding: 0; background-color: #0F1320; font-family: 'Avant Garde', 'Avenir', 'Helvetica Neue', sans-serif;">
  <div style="max-width: 520px; margin: 0 auto; padding: 40px 24px;">

    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 32px;">
      <img src="https://karica.it/graphics/Karica_Logo_Felice.png" alt="Karica" width="48" height="48" style="display: inline-block;" />
    </div>

    <!-- Main card -->
    <div style="background-color: #1E2540; border: 1px solid #2A3357; border-radius: 16px; padding: 32px;">

      <p style="color: #C8D0E0; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
        ${greeting}
      </p>

      <p style="color: #C8D0E0; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
        grazie per il tuo interesse in <strong style="color: #FFFFFF;">Karica</strong>.
        Abbiamo ricevuto la tua richiesta e ti invieremo il pitch deck completo
        nelle prossime ore.
      </p>

      <p style="color: #C8D0E0; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
        Nel frattempo, se hai domande, rispondi direttamente a questa email.
        Saremo felici di parlarne.
      </p>

      <!-- Divider -->
      <div style="height: 1px; background: linear-gradient(90deg, #39FF14, #00D4D4, #FF4D6D); opacity: 0.3; margin: 24px 0;"></div>

      <!-- Share -->
      <p style="color: #8892A4; font-size: 13px; line-height: 1.5; margin: 0 0 12px;">
        Conosci qualcuno che potrebbe essere interessato?
      </p>

      <p style="color: #C8D0E0; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
        Condividi questa opportunità — il round è aperto e
        i posti a queste condizioni sono limitati.
      </p>

      <div style="text-align: center;">
        <a href="https://karica.it/funding"
           style="display: inline-block; background-color: #39FF14; color: #161B2E; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
          Condividi karica.it/funding
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px;">
      <p style="color: #4A5270; font-size: 11px; line-height: 1.5; margin: 0;">
        Karica S.r.l. — Startup Innovativa<br>
        Via Vallarsa 11, Milano — P.IVA 14470800963
      </p>
    </div>

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
