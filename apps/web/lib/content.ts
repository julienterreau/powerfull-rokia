import { cache } from "react";
import { z } from "zod";
import {
  aboutSeed,
  articlesSeed,
  audiosSeed,
  blogFilters,
  blogPageSeed,
  categoriesSeed,
  contactPageSeed,
  diagnosticPageSeed,
  faqSeed,
  globalSeed,
  homeSeed,
  legalSeed,
  resultBandsSeed,
  testimonialsSeed,
  videosPageSeed,
  videosSeed,
} from "@/content/seed";
import type { Article, HomeContent, Video } from "@/content/types";
import { strapiEnabled } from "./env";
import { fetchStrapi } from "./strapi";
import { articleText, readingTime } from "./utils";

const link = z.object({ label: z.string().min(1), url: z.string().min(1) });
const seo = z.object({ metaTitle: z.string().min(1), metaDescription: z.string().min(1) });

const globalSchema = z.object({
  siteName: z.string().min(1),
  baseline: z.string().min(1),
  email: z.string().email(),
  youtubeUrl: z.string().min(1),
  youtubeHandle: z.string().min(1),
  disclaimer: z.string(),
  callWidgetEnabled: z.boolean(),
  menu: z.array(link).min(1),
  discover: z.array(link).min(1),
  aboutLinks: z.array(link).min(1),
  legal: z.array(link).min(1),
  seo,
});

async function load<T>(path: string, schema: z.ZodType<T>, fallback: T, tag: string): Promise<T> {
  if (!strapiEnabled()) return fallback;
  try {
    return await fetchStrapi(path, { schema, tags: [tag] });
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

export const getGlobal = cache(() => load("/api/global?populate=*", globalSchema, globalSeed, "global"));

export const getHome = cache(() =>
  load("/api/home?populate[sections][populate]=*", z.custom<HomeContent>(), homeSeed, "home"),
);

export const getAbout = cache(() => load("/api/about-page?populate=*", z.custom<typeof aboutSeed>(), aboutSeed, "about"));
export const getDiagnosticPage = cache(() => load("/api/diagnostic-page?populate=*", z.custom<typeof diagnosticPageSeed>(), diagnosticPageSeed, "diagnostic-page"));
export const getBlogPage = cache(() => load("/api/blog-page?populate=*", z.custom<typeof blogPageSeed>(), blogPageSeed, "blog-page"));
export const getVideosPage = cache(() => load("/api/videos-page?populate=*", z.custom<typeof videosPageSeed>(), videosPageSeed, "videos-page"));
export const getContactPage = cache(() => load("/api/contact-page?populate=*", z.custom<typeof contactPageSeed>(), contactPageSeed, "contact-page"));

export const getAudios = cache(async () => {
  if (!strapiEnabled()) return audiosSeed;
  try {
    const rows = await fetchStrapi("/api/diagnostic-audios?sort=order:asc&pagination[pageSize]=20&populate=audio", {
      schema: z.array(z.object({ order: z.number(), title: z.string(), url: z.string().optional(), audio: z.any().optional() })).min(1),
      tags: ["diagnostic-audio"],
    });
    return rows
      .map((row) => {
        const media = row.audio as { url?: string } | null;
        const url = row.url || (media?.url ? `${process.env.STRAPI_URL}${media.url}` : "/audio/placeholder.wav");
        return { order: row.order, title: row.title, url };
      })
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(error);
    return audiosSeed;
  }
});

export const getResults = cache(() =>
  load(
    "/api/diagnostic-results?sort=minScore:asc&populate=recommendedVideos",
    z.array(z.object({ minScore: z.number(), maxScore: z.number(), title: z.string(), text: z.string() })).min(1),
    resultBandsSeed,
    "diagnostic-result",
  ),
);

export const getArticles = cache(async () => articlesSeed);
export const getCategories = cache(async () => categoriesSeed);
export const getBlogFilters = cache(async () => blogFilters);
export const getVideos = cache(async () => videosSeed);
export const getTestimonials = cache(async () => testimonialsSeed.filter((item) => item.visible));
export const getFaq = cache(async () => [...faqSeed].sort((a, b) => a.order - b.order));

export function getArticle(slug: string) {
  return articlesSeed.find((article) => article.slug === slug) ?? null;
}

export function getLegal(slug: string) {
  return legalSeed.find((page) => page.slug === slug) ?? null;
}

export function withReadingTime(article: Article) {
  return { ...article, minutes: readingTime(articleText(article.blocks)) };
}

export function relatedArticles(slug: string, category: string) {
  return articlesSeed.filter((article) => article.slug !== slug && article.category === category).slice(0, 3);
}

export function recommendedVideos(score: number): Video[] {
  const band = resultBandsSeed.find((item) => score >= item.minScore && score <= item.maxScore);
  if (!band) return videosSeed.slice(0, 3);
  if (score >= 13) return videosSeed.filter((video) => video.category === "Protection" || video.category === "Sorcellerie").slice(0, 3);
  if (score >= 6) return videosSeed.filter((video) => video.category === "Protection" || video.category === "Mauvais œil").slice(0, 3);
  return videosSeed.slice(0, 3);
}

export function bandFor(score: number) {
  return resultBandsSeed.find((item) => score >= item.minScore && score <= item.maxScore) ?? resultBandsSeed[0];
}
