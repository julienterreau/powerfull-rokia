import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret") || new URL(request.url).searchParams.get("secret");
  if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Secret invalide." }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { tags?: string[]; model?: string };
  const tags = body.tags?.length ? body.tags : [body.model || "global", "home", "about", "diagnostic-page", "blog-page", "videos-page", "contact-page", "diagnostic-audio", "diagnostic-result"];
  for (const tag of tags) revalidateTag(tag);
  return NextResponse.json({ revalidated: tags });
}
