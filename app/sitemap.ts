import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const base = env.NEXT_PUBLIC_SITE_URL;
  const pages = ["", "/a-propos", "/diagnostic", "/blog", "/videos", "/contact", "/mentions-legales", "/confidentialite"].map((path) => ({
    url: `${base}${path || "/"}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const posts = articles.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
