import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function confirmationEmail(name: string, source: string) {
  const firstName = name ? name.split(" ")[0] : "";
  const greeting = firstName ? `Ciao ${firstName},` : "Ciao,";

  let body: string;
  if (source.startsWith("detrazione")) {
    body = `grazie per averci lasciato i tuoi contatti. Ti contattiamo entro 48 ore per spiegarti i passaggi del Family & Friends Round e rispondere a ogni dubbio.`;
  } else if (source === "waitlist") {
    body = `sei in lista d'attesa per provare Karica. Ti scriviamo nel momento esatto in cui l'app è pronta per te — niente prima, niente comunicazioni inutili nel mezzo.`;
  } else if (source === "newsletter") {
    body = `grazie per il tuo interesse in Karica. Ti scriveremo appena ci sono novità sul lancio della piattaforma.`;
  } else {
    body = `grazie per il tuo interesse in Karica. Abbiamo ricevuto la tua richiesta e ti invieremo il pitch deck completo nelle prossime ore.`;
  }

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
        ${body}
      </p>

      <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 32px;">
        Se hai domande, rispondi direttamente a questa email.
      </p>

    </div>

    <p style="color: #aaa; font-size: 11px; line-height: 1.5; margin: 24px 0 0; text-align: center;">
      Karica S.r.l. — Startup Innovativa — Milano
    </p>
  </div>
</body>
</html>`;
}

// Encode channel into the source column so the team can group by it in
// SQL without schema changes. Examples:
//   detrazione                  → direct landing, no UTM
//   detrazione:palazzini        → utm_source=palazzini
//   detrazione:alessandro       → utm_source=alessandro
// Query: SELECT source, COUNT(*) FROM leads_karica
//        WHERE source LIKE 'detrazione%' GROUP BY source;
function buildSourceTag(base: string, utmSource: string): string {
  const clean = utmSource.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32);
  if (!clean || clean === "direct") return base;
  return `${base}:${clean}`;
}

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
    } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email richiesta" }, { status: 400 });
    }

    const baseSource = typeof source === "string" && source ? source : "investiora";
    const utmSrc = typeof utm_source === "string" ? utm_source : "";
    const utmMed = typeof utm_medium === "string" ? utm_medium : "";
    const utmCmp = typeof utm_campaign === "string" ? utm_campaign : "";
    const leadSource = baseSource === "detrazione"
      ? buildSourceTag("detrazione", utmSrc)
      : baseSource;

    // Save to Supabase (existing schema: name, email, source)
    const { error: dbError } = await supabaseAdmin
      .from("leads_karica")
      .insert({ name: name || null, email, source: leadSource });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Errore nel salvataggio" }, { status: 500 });
    }

    // Notification email includes phone + UTM (which aren't in the DB schema).
    const utmRows = (utmSrc || utmMed || utmCmp)
      ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">utm_source</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${utmSrc || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">utm_medium</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${utmMed || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">utm_campaign</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${utmCmp || "—"}</td>
        </tr>`
      : "";

    try {
      await Promise.all([
        resend.emails.send({
          from: "Karica <noreply@mail.karica.it>",
          replyTo: email,
          to: process.env.NOTIFICATION_EMAIL!,
          subject: `Nuovo lead ${leadSource}: ${name || "Senza nome"} (${email})`,
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
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telefono</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || "—"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Source</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${leadSource}</td>
                </tr>${utmRows}
              </table>
            </div>
          `,
        }),
        resend.emails.send({
          from: "Karica <noreply@mail.karica.it>",
          replyTo: "alessandro.zanin@karica.it",
          to: email,
          subject: "Grazie per il tuo interesse in Karica",
          html: confirmationEmail(name || "", leadSource),
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
