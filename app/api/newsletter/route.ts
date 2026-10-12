import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas/forms";
import { rateLimit } from "@/lib/rate-limit";
import { payloadClient } from "@/lib/cms";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`news:${ip}`, 8)) {
    return NextResponse.json({ error: "Trop de tentatives." }, { status: 429 });
  }
  const body = await request.json().catch(() => null);
  if (body?.company) return NextResponse.json({ ok: true });
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "E-mail invalide." }, { status: 400 });
  }
  const source = body?.source === "podcast" ? "podcast" : "blog";
  const payload = await payloadClient();
  await payload.create({
    collection: "newsletter-subscribers",
    overrideAccess: true,
    data: { email: parsed.data.email, source },
  });
  return NextResponse.json({ ok: true });
}
