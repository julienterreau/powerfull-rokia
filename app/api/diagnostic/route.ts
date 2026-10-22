import { NextResponse } from "next/server";
import { diagnosticSchema } from "@/lib/schemas/forms";
import { bandFor, getResults, getVideos, recommendedVideos } from "@/lib/content";
import { rateLimit } from "@/lib/rate-limit";
import { sanityClient, sanityConfigured } from "@/lib/sanity/client";

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
  const [bands, videos] = await Promise.all([getResults(), getVideos()]);
  const band = bandFor(score, bands);
  const recommended = recommendedVideos(score, videos);
  try {
    if (sanityConfigured()) {
      await sanityClient().create({
        _type: "diagnosticSubmission",
        name: parsed.data.name,
        email: parsed.data.email,
        answers: JSON.stringify(parsed.data.answers),
        score,
        submittedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ score, band, videos: recommended });
}
