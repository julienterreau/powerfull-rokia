import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/forms";
import { rateLimit } from "@/lib/rate-limit";
import { payloadClient } from "@/lib/cms";

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
  const payload = await payloadClient();
  await payload.create({
    collection: "contact-messages",
    overrideAccess: true,
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
      consent: true,
    },
  });
  return NextResponse.json({ ok: true });
}
