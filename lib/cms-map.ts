import type { Article, Block, ButtonVariant, Cta, HomeSection, Video } from "@/content/types";

type Row = Record<string, unknown>;
type LinkRow = { label?: string | null; url?: string | null; variant?: string | null };
type MediaFile = { url?: string | null; alt?: string | null };

const variants = new Set<ButtonVariant>(["primary", "gold", "outline", "white", "outline-light"]);

export function labels(rows: unknown): string[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => (row && typeof row === "object" && "label" in row ? String(row.label || "") : "")).filter(Boolean);
}

export function link(value: unknown, fallback: Cta): Cta {
  const row = (value || {}) as LinkRow;
  const variant = variants.has(row.variant as ButtonVariant) ? (row.variant as ButtonVariant) : fallback.variant;
  return { label: row.label || fallback.label, url: row.url || fallback.url, variant };
}

export function links(rows: unknown) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => row as LinkRow)
    .filter((row) => row.label && row.url)
    .map((row) => ({ label: row.label as string, url: row.url as string }));
}

export function mediaUrl(value: unknown) {
  if (!value || typeof value !== "object") return null;
  return (value as MediaFile).url || null;
}

export function mediaAlt(value: unknown) {
  if (!value || typeof value !== "object") return "";
  return (value as MediaFile).alt || "";
}

export function relationName(value: unknown) {
  if (!value || typeof value !== "object" || !("name" in value)) return "";
  return String((value as { name?: string }).name || "");
}

function text(block: Row, key: string) {
  return String(block[key] || "");
}

export function articleBlocks(rows: unknown): Block[] {
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((item): Block[] => {
    const block = item as Row;
    switch (block.blockType) {
      case "paragraph":
        return [{ type: "paragraph", text: text(block, "text") }];
      case "heading":
        return [{ type: "heading", text: text(block, "text") }];
      case "quote":
        return [{ type: "quote", text: text(block, "text") }];
      case "verse":
        return [{ type: "verse", arabic: text(block, "arabic"), translation: text(block, "translation"), reference: text(block, "reference") }];
      case "youtube":
        return [{ type: "youtube", url: text(block, "url"), title: text(block, "title") }];
      case "note":
        return [{ type: "note", text: text(block, "text") }];
      default:
        return [];
    }
  });
}

const sectionKind: Record<string, HomeSection["__component"]> = {
  hero: "home.hero",
  themes: "home.themes-strip",
  how: "home.how-it-works",
  diagnostic: "home.diagnostic-teaser",
  videos: "home.latest-videos",
  why: "home.why-us",
  highlight: "sections.text-highlight",
  blog: "home.blog-preview",
  testimonials: "home.testimonials",
  faq: "home.faq-preview",
  podcast: "home.podcast",
  verse: "home.verse",
};

const emptyCta: Cta = { label: "Continuer", url: "/", variant: "primary" };

export function homeSections(rows: unknown): HomeSection[] {
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((item): HomeSection[] => {
    const block = item as Row;
    const kind = sectionKind[String(block.blockType)];
    if (!kind) return [];
    if (kind === "home.hero") {
      return [{ __component: kind, badge: text(block, "badge"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), lead: text(block, "lead"), forLabel: text(block, "forLabel"), chips: labels(block.chips), primary: link(block.primary, emptyCta), secondary: link(block.secondary, emptyCta), guarantees: labels(block.guarantees) }];
    }
    if (kind === "home.themes-strip") return [{ __component: kind, items: labels(block.items) }];
    if (kind === "home.how-it-works") {
      const steps = Array.isArray(block.steps) ? block.steps.map((step) => step as Row) : [];
      return [{ __component: kind, eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), lead: text(block, "lead"), steps: steps.map((step) => ({ number: text(step, "number"), title: text(step, "title"), text: text(step, "text"), linkLabel: text(step, "linkLabel"), url: text(step, "url") })) }];
    }
    if (kind === "home.diagnostic-teaser") {
      return [{ __component: kind, eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), lead: text(block, "lead"), checks: labels(block.checks), cta: link(block.cta, emptyCta), previewTitle: text(block, "previewTitle"), openLabel: text(block, "openLabel"), moreLabel: text(block, "moreLabel") }];
    }
    if (kind === "home.latest-videos") {
      return [{ __component: kind, eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), lead: text(block, "lead"), cta: link(block.cta, emptyCta), limit: Number(block.limit) || 4 }];
    }
    if (kind === "home.blog-preview") {
      return [{ __component: kind, eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), cta: link(block.cta, emptyCta), limit: Number(block.limit) || 3 }];
    }
    if (kind === "home.why-us") {
      const features = Array.isArray(block.features) ? block.features.map((feature) => feature as Row) : [];
      return [{ __component: kind, eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), lead: text(block, "lead"), cta: link(block.cta, emptyCta), features: features.map((feature) => ({ icon: text(feature, "icon") === "book" || text(feature, "icon") === "heart" ? (text(feature, "icon") as "book" | "heart") : "shield", title: text(feature, "title"), text: text(feature, "text") })) }];
    }
    if (kind === "sections.text-highlight") {
      return [{ __component: kind, eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), text: text(block, "text"), ctaLabel: text(block, "ctaLabel"), ctaHref: text(block, "ctaHref") }];
    }
    if (kind === "home.testimonials") return [{ __component: kind, eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), note: text(block, "note") }];
    if (kind === "home.faq-preview") return [{ __component: kind, eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), lead: text(block, "lead"), cta: link(block.cta, emptyCta), limit: Number(block.limit) || 4 }];
    if (kind === "home.podcast") {
      return [{ __component: kind, enabled: Boolean(block.enabled), eyebrow: text(block, "eyebrow"), title: text(block, "title"), titleAccent: text(block, "titleAccent"), titleAfter: text(block, "titleAfter"), lead: text(block, "lead"), placeholder: text(block, "placeholder"), button: text(block, "button"), note: text(block, "note") }];
    }
    return [{ __component: "home.verse", arabic: text(block, "arabic"), translation: text(block, "translation"), reference: text(block, "reference") }];
  });
}

export function toArticle(doc: Row): Article {
  const seo = (doc.seo || {}) as { metaTitle?: string; metaDescription?: string };
  return {
    title: text(doc, "title"),
    slug: text(doc, "slug"),
    excerpt: text(doc, "excerpt"),
    category: relationName(doc.category),
    coverColor: "#F6F1E7",
    coverUrl: mediaUrl(doc.cover),
    coverAlt: mediaAlt(doc.cover),
    featured: Boolean(doc.featured),
    publishedAt: text(doc, "publishedAt") || new Date().toISOString(),
    author: text(doc, "author") || "Powerfull Rokia",
    blocks: articleBlocks(doc.content),
    seo: { metaTitle: seo.metaTitle || text(doc, "title"), metaDescription: seo.metaDescription || text(doc, "excerpt") },
  };
}

export function toVideo(doc: Row): Video {
  return {
    title: text(doc, "title"),
    youtubeUrl: text(doc, "youtubeUrl"),
    duration: text(doc, "duration"),
    category: relationName(doc.category),
    gradient: text(doc, "gradient") || "#0F3D33",
    thumbnailUrl: mediaUrl(doc.thumbnail),
    featured: Boolean(doc.featured),
    publishedAt: text(doc, "publishedAt") || new Date().toISOString(),
    description: text(doc, "description"),
  };
}
