import { NextResponse } from "next/server";
import { diagnosticSchema } from "@/lib/schemas/forms";
import { bandFor, recommendedVideos } from "@/lib/content";
import { rateLimit } from "@/lib/rate-limit";
import { postStrapi } from "@/lib/strapi";
import { strapiEnabled } from "@/lib/env";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`diag:${ip}`, 8)) {
    return NextResponse.json({ error: "Trop de tentatives." }, { status: 429 });
  }
  const body = await request.json().catch(() => null);
  const parsed = diagnosticSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Réponses incomplètes." }, { status: 400 });
  }
  const score = Object.values(parsed.data.answers).filter((answer) => answer === "oui").length;
  const band = bandFor(score);
  const videos = recommendedVideos(score).map((video) => ({ title: video.title, youtubeUrl: video.youtubeUrl, duration: video.duration, category: video.category, gradient: video.gradient, thumbnailUrl: video.thumbnailUrl, featured: video.featured, publishedAt: video.publishedAt, description: video.description }));
  if (strapiEnabled()) {
    try {
      await postStrapi("/api/diagnostic-submissions", {
        name: parsed.data.name,
        email: parsed.data.email,
        answers: parsed.data.answers,
        score,
        submittedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
    }
  }
  return NextResponse.json({ score, band, videos });
}
