import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/forms";
import { rateLimit } from "@/lib/rate-limit";
import { sanityClient, sanityConfigured } from "@/lib/sanity/client";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`contact:${ip}`)) {
    return NextResponse.json({ error: "Trop de messages. Réessayez dans une minute." }, { status: 429 });
  }
  const body = await request.json().catch(() => null);
  if (body?.company) return NextResponse.json({ ok: true });
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Message incomplet." }, { status: 400 });
  }
  if (!sanityConfigured()) return NextResponse.json({ error: "L'envoi a échoué." }, { status: 500 });
  await sanityClient().create({
    _type: "contactMessage",
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
    consent: true,
  });
  return NextResponse.json({ ok: true });
}
