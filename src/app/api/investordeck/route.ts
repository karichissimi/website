import { createHmac, timingSafeEqual } from "crypto";
import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

// Shared password gate for the investor deck. The PDF lives in /private
// (outside /public) so it can only be served through this route.
const PASSWORD = process.env.INVESTOR_DECK_PASSWORD ?? "karica2026";
const COOKIE_NAME = "karica_deck";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Token derived from the password: changing the password invalidates
// every previously issued cookie without any extra state.
function expectedToken(): string {
  return createHmac("sha256", PASSWORD).update("investordeck-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get(COOKIE_NAME)?.value ?? "";
  return cookie.length > 0 && safeEqual(cookie, expectedToken());
}

// POST { password } → sets the auth cookie when the password matches.
export async function POST(req: NextRequest) {
  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // malformed body → treated as wrong password
  }

  if (!safeEqual(password.trim(), PASSWORD)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

// HEAD → cheap auth check used by the page to auto-unlock returning visitors.
export async function HEAD(req: NextRequest) {
  return new NextResponse(null, { status: isAuthorized(req) ? 204 : 401 });
}

// GET → streams the PDF, only with a valid cookie. `?download=1` forces
// attachment instead of the inline viewer.
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const filePath = path.join(process.cwd(), "private", "investor-deck.pdf");
  const file = await readFile(filePath);
  const download = req.nextUrl.searchParams.get("download") === "1";

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(file.length),
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="Karica-Investor-Deck.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
