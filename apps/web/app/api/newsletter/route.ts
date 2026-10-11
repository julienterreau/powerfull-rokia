import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas/forms";
import { rateLimit } from "@/lib/rate-limit";
import { postStrapi } from "@/lib/strapi";
import { strapiEnabled } from "@/lib/env";

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
  if (strapiEnabled()) {
    await postStrapi("/api/newsletter-subscribers", { email: parsed.data.email, source: body?.source || "site" });
  }
  return NextResponse.json({ ok: true });
}
