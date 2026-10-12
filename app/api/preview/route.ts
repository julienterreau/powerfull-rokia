import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug") || "/";
  if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Aperçu refusé." }, { status: 401 });
  }
  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(slug, env.NEXT_PUBLIC_SITE_URL));
}
