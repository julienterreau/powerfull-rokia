import { cache } from "react";
import {
  aboutSeed,
  articlesSeed,
  audiosSeed,
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
import type { Article, ContactCard, ContactPageContent, GlobalContent, HomeContent, ResultBand, Video } from "@/content/types";
import { payloadClient } from "./cms";
import { homeSections, labels, link, links, mediaAlt, mediaUrl, toArticle, toVideo } from "./cms-map";
import { articleText, readingTime } from "./utils";

type Doc = Record<string, unknown>;

async function cms<T>(read: () => Promise<T | null>, seed: T): Promise<T> {
  try {
    return (await read()) ?? seed;
  } catch (error) {
    console.error(error);
    return seed;
  }
}

async function globalDoc(slug: string) {
  const payload = await payloadClient();
  return payload.findGlobal({ slug: slug as never, depth: 2 }) as Promise<Doc>;
}

async function docs(collection: string) {
  const payload = await payloadClient();
  const result = await payload.find({ collection: collection as never, depth: 2, limit: 100, pagination: false });
  return result.docs as unknown as Doc[];
}

function text(doc: Doc, key: string) {
  return String(doc[key] || "");
}

function contactIcon(value: string): ContactCard["icon"] {
  if (value === "phone" || value === "video") return value;
  return "mail";
}

function seo(doc: Doc, fallbackTitle: string, fallbackDescription: string) {
  const value = (doc.seo || {}) as { metaTitle?: string; metaDescription?: string };
  return { metaTitle: value.metaTitle || fallbackTitle, metaDescription: value.metaDescription || fallbackDescription };
}

export const getGlobal = cache(() =>
  cms(async () => {
    const doc = await globalDoc("site");
    if (!text(doc, "siteName") || links(doc.menu).length === 0) return null;
    const content: GlobalContent = {
      siteName: text(doc, "siteName"),
      baseline: text(doc, "baseline"),
      email: text(doc, "email"),
      youtubeUrl: text(doc, "youtubeUrl"),
      youtubeHandle: text(doc, "youtubeHandle"),
      disclaimer: text(doc, "disclaimer"),
      callWidgetEnabled: doc.callWidgetEnabled !== false,
      menu: links(doc.menu),
      discover: links(doc.discover),
      aboutLinks: links(doc.aboutLinks),
      legal: links(doc.legal),
      seo: seo(doc, text(doc, "siteName"), text(doc, "baseline")),
    };
    return content;
  }, globalSeed),
);

export const getHome = cache(() =>
  cms(async () => {
    const doc = await globalDoc("home");
    const sections = homeSections(doc.sections);
    if (sections.length === 0) return null;
    const content: HomeContent = { seo: seo(doc, globalSeed.seo.metaTitle, globalSeed.seo.metaDescription), sections };
    return content;
  }, homeSeed),
);

export const getAbout = cache(() =>
  cms(async () => {
    const doc = await globalDoc("about");
    if (!text(doc, "title")) return null;
    const story = Array.isArray(doc.story) ? doc.story.map((item) => text(item as Doc, "text")).filter(Boolean) : [];
    return {
      ...aboutSeed,
      seo: seo(doc, aboutSeed.seo.metaTitle, aboutSeed.seo.metaDescription),
      crumb: text(doc, "crumb"),
      eyebrow: text(doc, "eyebrow"),
      title: text(doc, "title"),
      titleAccent: text(doc, "titleAccent"),
      titleAfter: text(doc, "titleAfter"),
      lead: text(doc, "lead"),
      storyEyebrow: text(doc, "storyEyebrow"),
      storyTitle: text(doc, "storyTitle"),
      storyAccent: text(doc, "storyAccent"),
      story,
      storyCta: link(doc.storyCta, aboutSeed.storyCta),
      photoLabel: text(doc, "photoLabel"),
      photoUrl: mediaUrl(doc.photo),
      photoAlt: mediaAlt(doc.photo),
      stats: Array.isArray(doc.stats) ? doc.stats.map((item) => ({ value: text(item as Doc, "value"), label: text(item as Doc, "label") })) : [],
      valuesEyebrow: text(doc, "valuesEyebrow"),
      valuesTitle: text(doc, "valuesTitle"),
      valuesAccent: text(doc, "valuesAccent"),
      values: Array.isArray(doc.values) ? doc.values.map((item) => ({ number: text(item as Doc, "number"), title: text(item as Doc, "title"), text: text(item as Doc, "text") })) : [],
      disclaimerTitle: text(doc, "disclaimerTitle"),
      disclaimer: text(doc, "disclaimer"),
      ctaTitle: text(doc, "ctaTitle"),
      ctaLead: text(doc, "ctaLead"),
      ctaPrimary: link(doc.ctaPrimary, aboutSeed.ctaPrimary),
      ctaSecondary: link(doc.ctaSecondary, aboutSeed.ctaSecondary),
    };
  }, aboutSeed),
);

export const getDiagnosticPage = cache(() =>
  cms(async () => {
    const doc = await globalDoc("diagnostic-page");
    if (!text(doc, "title")) return null;
    return {
      ...diagnosticPageSeed,
      seo: seo(doc, diagnosticPageSeed.seo.metaTitle, diagnosticPageSeed.seo.metaDescription),
      crumb: text(doc, "crumb"),
      eyebrow: text(doc, "eyebrow"),
      title: text(doc, "title"),
      titleAccent: text(doc, "titleAccent"),
      lead: text(doc, "lead"),
      guarantees: labels(doc.guarantees),
      tipsEyebrow: text(doc, "tipsEyebrow"),
      tipsTitle: text(doc, "tipsTitle"),
      tipsAccent: text(doc, "tipsAccent"),
      tips: Array.isArray(doc.tips) ? doc.tips.map((item) => ({ number: text(item as Doc, "number"), title: text(item as Doc, "title"), text: text(item as Doc, "text") })) : [],
      toolEyebrow: text(doc, "toolEyebrow"),
      toolTitle: text(doc, "toolTitle"),
      toolAccent: text(doc, "toolAccent"),
      nameLabel: text(doc, "nameLabel"),
      emailLabel: text(doc, "emailLabel"),
      progressLabel: text(doc, "progressLabel"),
      yesLabel: text(doc, "yesLabel"),
      noLabel: text(doc, "noLabel"),
      submitLabel: text(doc, "submitLabel"),
      confidential: text(doc, "confidential"),
      moreLabel: text(doc, "moreLabel"),
      resultNote: text(doc, "resultNote"),
    };
  }, diagnosticPageSeed),
);

export const getBlogPage = cache(() =>
  cms(async () => {
    const doc = await globalDoc("blog-page");
    if (!text(doc, "title")) return null;
    return {
      ...blogPageSeed,
      seo: seo(doc, blogPageSeed.seo.metaTitle, blogPageSeed.seo.metaDescription),
      crumb: text(doc, "crumb") || blogPageSeed.crumb,
      eyebrow: text(doc, "eyebrow") || blogPageSeed.eyebrow,
      title: text(doc, "title"),
      titleAccent: text(doc, "titleAccent") || blogPageSeed.titleAccent,
      lead: text(doc, "lead") || blogPageSeed.lead,
      readLabel: text(doc, "readLabel") || blogPageSeed.readLabel,
      featuredLabel: text(doc, "featuredLabel") || blogPageSeed.featuredLabel,
      loadMore: text(doc, "loadMore") || blogPageSeed.loadMore,
      newsletterTitle: text(doc, "newsletterTitle") || blogPageSeed.newsletterTitle,
      newsletterText: text(doc, "newsletterText") || blogPageSeed.newsletterText,
      newsletterPlaceholder: text(doc, "newsletterPlaceholder") || blogPageSeed.newsletterPlaceholder,
      newsletterButton: text(doc, "newsletterButton") || blogPageSeed.newsletterButton,
      empty: text(doc, "empty") || blogPageSeed.empty,
    };
  }, blogPageSeed),
);

export const getVideosPage = cache(() =>
  cms(async () => {
    const doc = await globalDoc("videos-page");
    if (!text(doc, "title")) return null;
    return {
      ...videosPageSeed,
      seo: seo(doc, videosPageSeed.seo.metaTitle, videosPageSeed.seo.metaDescription),
      crumb: text(doc, "crumb"),
      eyebrow: text(doc, "eyebrow"),
      title: text(doc, "title"),
      titleAccent: text(doc, "titleAccent"),
      lead: text(doc, "lead"),
      latestLabel: text(doc, "latestLabel"),
      watchLabel: text(doc, "watchLabel"),
      allLabel: text(doc, "allLabel"),
      allUrl: text(doc, "allUrl"),
      bannerTitle: text(doc, "bannerTitle"),
      bannerText: text(doc, "bannerText"),
      bannerCta: link(doc.bannerCta, videosPageSeed.bannerCta),
      filters: labels(doc.filters),
    };
  }, videosPageSeed),
);

export const getContactPage = cache(() =>
  cms<ContactPageContent>(async () => {
    const doc = await globalDoc("contact-page");
    if (!text(doc, "title")) return null;
    const cards: ContactCard[] = Array.isArray(doc.cards)
      ? doc.cards.map((item) => {
          const card = item as Doc;
          return {
            icon: contactIcon(text(card, "icon")),
            title: text(card, "title"),
            text: text(card, "text"),
            label: text(card, "label"),
            url: text(card, "url"),
            action: text(card, "action") === "widget" ? "widget" : "link",
          };
        })
      : contactPageSeed.cards;
    return {
      ...contactPageSeed,
      seo: seo(doc, contactPageSeed.seo.metaTitle, contactPageSeed.seo.metaDescription),
      crumb: text(doc, "crumb") || contactPageSeed.crumb,
      eyebrow: text(doc, "eyebrow") || contactPageSeed.eyebrow,
      title: text(doc, "title"),
      titleAccent: text(doc, "titleAccent") || contactPageSeed.titleAccent,
      lead: text(doc, "lead") || contactPageSeed.lead,
      cards,
      formTitle: text(doc, "formTitle") || contactPageSeed.formTitle,
      nameLabel: text(doc, "nameLabel") || contactPageSeed.nameLabel,
      emailLabel: text(doc, "emailLabel") || contactPageSeed.emailLabel,
      subjectLabel: text(doc, "subjectLabel") || contactPageSeed.subjectLabel,
      messageLabel: text(doc, "messageLabel") || contactPageSeed.messageLabel,
      namePlaceholder: text(doc, "namePlaceholder") || contactPageSeed.namePlaceholder,
      emailPlaceholder: text(doc, "emailPlaceholder") || contactPageSeed.emailPlaceholder,
      subjectPlaceholder: text(doc, "subjectPlaceholder") || contactPageSeed.subjectPlaceholder,
      messagePlaceholder: text(doc, "messagePlaceholder") || contactPageSeed.messagePlaceholder,
      consent: text(doc, "consent") || contactPageSeed.consent,
      submit: text(doc, "submit") || contactPageSeed.submit,
      success: text(doc, "success") || contactPageSeed.success,
      faqEyebrow: text(doc, "faqEyebrow") || contactPageSeed.faqEyebrow,
      faqTitle: text(doc, "faqTitle") || contactPageSeed.faqTitle,
      faqAccent: text(doc, "faqAccent") || contactPageSeed.faqAccent,
    };
  }, contactPageSeed),
);

export const getAudios = cache(() =>
  cms(async () => {
    const rows = (await docs("diagnostic-audios")).filter((row) => row.isActive !== false);
    if (rows.length === 0) return null;
    return rows
      .map((row) => ({ order: Number(row.order) || 0, title: text(row, "title"), url: String(row.url || "/audio/placeholder.wav") }))
      .sort((a, b) => a.order - b.order);
  }, audiosSeed),
);

export const getResults = cache(() =>
  cms(async () => {
    const rows = await docs("diagnostic-results");
    if (rows.length === 0) return null;
    return rows
      .map((row) => ({ minScore: Number(row.minScore), maxScore: Number(row.maxScore), title: text(row, "title"), text: text(row, "text") }))
      .sort((a, b) => a.minScore - b.minScore);
  }, resultBandsSeed),
);

export const getArticles = cache(() =>
  cms(async () => {
    const rows = await docs("articles");
    if (rows.length === 0) return null;
    return rows.map(toArticle);
  }, articlesSeed),
);

export const getCategories = cache(() =>
  cms(async () => {
    const rows = await docs("categories");
    if (rows.length === 0) return null;
    return rows.map((row) => ({ name: text(row, "name"), slug: text(row, "slug"), color: text(row, "color") || "#EDE4D3" }));
  }, categoriesSeed),
);

export const getBlogFilters = cache(async () => {
  const categories = await getCategories();
  return ["Tous", ...categories.map((category) => category.name)];
});

export const getVideos = cache(() =>
  cms(async () => {
    const rows = await docs("videos");
    if (rows.length === 0) return null;
    return rows.map(toVideo);
  }, videosSeed),
);

export const getTestimonials = cache(() =>
  cms(async () => {
    const rows = await docs("testimonials");
    const visible = rows.filter((row) => row.visible !== false);
    if (visible.length === 0) return null;
    return visible.map((row) => ({ handle: text(row, "handle"), text: text(row, "text"), url: text(row, "url"), visible: true }));
  }, testimonialsSeed.filter((item) => item.visible)),
);

export const getFaq = cache(() =>
  cms(async () => {
    const rows = await docs("faq-items");
    if (rows.length === 0) return null;
    return rows
      .map((row) => ({ question: text(row, "question"), answer: text(row, "answer"), order: Number(row.order) || 0, showOnHome: Boolean(row.showOnHome) }))
      .sort((a, b) => a.order - b.order);
  }, [...faqSeed].sort((a, b) => a.order - b.order)),
);

export const getArticle = cache(async (slug: string) => {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug) ?? null;
});

export const getLegal = cache(async (slug: string) => {
  return cms(async () => {
    const payload = await payloadClient();
    const result = await payload.find({ collection: "legal-pages" as never, where: { slug: { equals: slug } }, depth: 1, limit: 1 });
    const doc = result.docs[0] as unknown as Doc | undefined;
    if (!doc) return null;
    const page = legalSeed.find((item) => item.slug === slug);
    return {
      slug,
      seo: seo(doc, page?.seo.metaTitle || text(doc, "title"), page?.seo.metaDescription || text(doc, "lead")),
      eyebrow: text(doc, "eyebrow"),
      title: text(doc, "title"),
      lead: text(doc, "lead"),
      blocks: toArticle({ ...doc, content: doc.content, title: text(doc, "title"), slug, excerpt: text(doc, "lead") }).blocks,
    };
  }, legalSeed.find((page) => page.slug === slug) ?? null);
});

export function withReadingTime(article: Article) {
  return { ...article, minutes: readingTime(articleText(article.blocks)) };
}

export function relatedArticles(articles: Article[], slug: string, category: string) {
  return articles.filter((article) => article.slug !== slug && article.category === category).slice(0, 3);
}

export function recommendedVideos(score: number, videos: Video[] = videosSeed): Video[] {
  if (score >= 13) return videos.filter((video) => video.category === "Protection" || video.category === "Sorcellerie").slice(0, 3);
  if (score >= 6) return videos.filter((video) => video.category === "Protection" || video.category === "Mauvais œil").slice(0, 3);
  return videos.slice(0, 3);
}

export function bandFor(score: number, bands: ResultBand[] = resultBandsSeed) {
  return bands.find((item) => score >= item.minScore && score <= item.maxScore) ?? bands[0];
}
