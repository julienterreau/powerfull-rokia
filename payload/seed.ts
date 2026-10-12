import { getPayload, type Payload } from "payload";
import config from "@payload-config";
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
} from "../content/seed";
import type { Block, Cta, HomeSection } from "../content/types";

type Row = Record<string, unknown>;

function labels(items: string[]) {
  return items.map((label) => ({ label }));
}

function button(value: Cta) {
  return { label: value.label, url: value.url, variant: value.variant };
}

function contentBlock(block: Block) {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "quote":
    case "note":
      return { blockType: block.type, text: block.text };
    case "verse":
      return { blockType: "verse" as const, arabic: block.arabic, translation: block.translation, reference: block.reference };
    case "youtube":
      return { blockType: "youtube" as const, url: block.url, title: block.title };
    default: {
      const unreachable: never = block;
      return unreachable;
    }
  }
}

function homeBlock(section: HomeSection) {
  switch (section.__component) {
    case "home.hero":
      return {
        blockType: "hero" as const,
        badge: section.badge,
        title: section.title,
        titleAccent: section.titleAccent,
        lead: section.lead,
        forLabel: section.forLabel,
        chips: labels(section.chips),
        primary: button(section.primary),
        secondary: button(section.secondary),
        guarantees: labels(section.guarantees),
      };
    case "home.themes-strip":
      return { blockType: "themes" as const, items: labels(section.items) };
    case "home.how-it-works":
      return {
        blockType: "how" as const,
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        lead: section.lead,
        steps: section.steps,
      };
    case "home.diagnostic-teaser":
      return {
        blockType: "diagnostic" as const,
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        lead: section.lead,
        checks: labels(section.checks),
        cta: button(section.cta),
        previewTitle: section.previewTitle,
        openLabel: section.openLabel,
        moreLabel: section.moreLabel,
      };
    case "home.latest-videos":
      return {
        blockType: "videos" as const,
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        lead: section.lead,
        cta: button(section.cta),
        limit: section.limit,
      };
    case "home.why-us":
      return {
        blockType: "why" as const,
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        lead: section.lead,
        cta: section.cta ? button(section.cta) : undefined,
        features: section.features,
      };
    case "sections.text-highlight":
      return {
        blockType: "highlight" as const,
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        text: section.text,
        ctaLabel: section.ctaLabel,
        ctaHref: section.ctaHref,
      };
    case "home.blog-preview":
      return {
        blockType: "blog" as const,
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        cta: button(section.cta),
        limit: section.limit,
      };
    case "home.testimonials":
      return { blockType: "testimonials" as const, eyebrow: section.eyebrow, title: section.title, titleAccent: section.titleAccent, note: section.note };
    case "home.faq-preview":
      return {
        blockType: "faq" as const,
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        lead: section.lead,
        cta: button(section.cta),
        limit: section.limit,
      };
    case "home.podcast":
      return {
        blockType: "podcast" as const,
        enabled: section.enabled,
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        titleAfter: section.titleAfter,
        lead: section.lead,
        placeholder: section.placeholder,
        button: section.button,
        note: section.note,
      };
    case "home.verse":
      return { blockType: "verse" as const, arabic: section.arabic, translation: section.translation, reference: section.reference };
    default: {
      const unreachable: never = section;
      return unreachable;
    }
  }
}

function silentWav() {
  const samples = 8000;
  const dataSize = samples * 2;
  const file = Buffer.alloc(44 + dataSize);
  file.write("RIFF", 0);
  file.writeUInt32LE(36 + dataSize, 4);
  file.write("WAVE", 8);
  file.write("fmt ", 12);
  file.writeUInt32LE(16, 16);
  file.writeUInt16LE(1, 20);
  file.writeUInt16LE(1, 22);
  file.writeUInt32LE(8000, 24);
  file.writeUInt32LE(16000, 28);
  file.writeUInt16LE(2, 32);
  file.writeUInt16LE(16, 34);
  file.write("data", 36);
  file.writeUInt32LE(dataSize, 40);
  return file;
}

async function fillGlobal(payload: Payload, slug: string, empty: (doc: Row) => boolean, data: Row) {
  const current = (await payload.findGlobal({ slug: slug as never, overrideAccess: true })) as Row;
  if (!empty(current)) return false;
  await payload.updateGlobal({ slug: slug as never, overrideAccess: true, data: data as never });
  return true;
}

async function existing(payload: Payload, collection: string, where: Row) {
  const result = await payload.find({ collection: collection as never, where: where as never, limit: 1, overrideAccess: true });
  return result.docs[0] as { id: number } | undefined;
}

async function seed(payload: Payload) {
  const saved: string[] = [];

  if (
    await fillGlobal(payload, "site", (doc) => !doc.siteName, {
      siteName: globalSeed.siteName,
      baseline: globalSeed.baseline,
      email: globalSeed.email,
      youtubeUrl: globalSeed.youtubeUrl,
      youtubeHandle: globalSeed.youtubeHandle,
      disclaimer: globalSeed.disclaimer,
      callWidgetEnabled: globalSeed.callWidgetEnabled,
      menu: globalSeed.menu,
      discover: globalSeed.discover,
      aboutLinks: globalSeed.aboutLinks,
      legal: globalSeed.legal,
      seo: globalSeed.seo,
    })
  ) {
    saved.push("site");
  }

  if (await fillGlobal(payload, "home", (doc) => !Array.isArray(doc.sections) || doc.sections.length === 0, { seo: homeSeed.seo, sections: homeSeed.sections.map(homeBlock) })) {
    saved.push("accueil");
  }

  if (
    await fillGlobal(payload, "about", (doc) => !doc.title, {
      seo: aboutSeed.seo,
      crumb: aboutSeed.crumb,
      eyebrow: aboutSeed.eyebrow,
      title: aboutSeed.title,
      titleAccent: aboutSeed.titleAccent,
      titleAfter: aboutSeed.titleAfter,
      lead: aboutSeed.lead,
      storyEyebrow: aboutSeed.storyEyebrow,
      storyTitle: aboutSeed.storyTitle,
      storyAccent: aboutSeed.storyAccent,
      story: aboutSeed.story.map((text) => ({ text })),
      storyCta: button(aboutSeed.storyCta),
      photoLabel: aboutSeed.photoLabel,
      stats: aboutSeed.stats,
      valuesEyebrow: aboutSeed.valuesEyebrow,
      valuesTitle: aboutSeed.valuesTitle,
      valuesAccent: aboutSeed.valuesAccent,
      values: aboutSeed.values,
      disclaimerTitle: aboutSeed.disclaimerTitle,
      disclaimer: aboutSeed.disclaimer,
      ctaTitle: aboutSeed.ctaTitle,
      ctaLead: aboutSeed.ctaLead,
      ctaPrimary: button(aboutSeed.ctaPrimary),
      ctaSecondary: button(aboutSeed.ctaSecondary),
    })
  ) {
    saved.push("à propos");
  }

  const { seo: diagnosticSeo, guarantees, ...diagnosticRest } = diagnosticPageSeed;
  if (await fillGlobal(payload, "diagnostic-page", (doc) => !doc.title, { ...diagnosticRest, seo: diagnosticSeo, guarantees: labels(guarantees) })) {
    saved.push("diagnostic");
  }

  if (await fillGlobal(payload, "blog-page", (doc) => !doc.title, blogPageSeed)) saved.push("blog");

  const { filters, ...videosPage } = videosPageSeed;
  if (await fillGlobal(payload, "videos-page", (doc) => !doc.title, { ...videosPage, filters: labels(filters) })) saved.push("vidéos");

  if (await fillGlobal(payload, "contact-page", (doc) => !doc.title, contactPageSeed)) saved.push("contact");

  const categories = [
    ...categoriesSeed,
    { name: "Sommeil", slug: "sommeil", color: "#EDE4D3" },
    { name: "Sorcellerie", slug: "sorcellerie", color: "#EDE4D3" },
  ];
  const categoryIds = new Map<string, number>();
  for (const category of categories) {
    const found = await existing(payload, "categories", { slug: { equals: category.slug } });
    const doc =
      found ??
      (await payload.create({
        collection: "categories",
        overrideAccess: true,
        data: category,
      }));
    categoryIds.set(category.name, doc.id);
    if (!found) saved.push(`catégorie ${category.name}`);
  }

  for (const article of articlesSeed) {
    if (await existing(payload, "articles", { slug: { equals: article.slug } })) continue;
    await payload.create({
      collection: "articles",
      overrideAccess: true,
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        category: categoryIds.get(article.category) ?? null,
        content: article.blocks.map(contentBlock),
        featured: article.featured,
        author: article.author,
        publishedAt: article.publishedAt,
        seo: article.seo,
        _status: "published",
      },
    });
    saved.push(`article ${article.slug}`);
  }

  for (const video of videosSeed) {
    if (await existing(payload, "videos", { title: { equals: video.title } })) continue;
    await payload.create({
      collection: "videos",
      overrideAccess: true,
      data: {
        title: video.title,
        youtubeUrl: video.youtubeUrl,
        duration: video.duration,
        description: video.description,
        category: categoryIds.get(video.category) ?? null,
        gradient: video.gradient,
        featured: video.featured,
        publishedAt: video.publishedAt,
        _status: "published",
      },
    });
    saved.push(`vidéo ${video.title}`);
  }

  for (const [index, item] of testimonialsSeed.entries()) {
    if (await existing(payload, "testimonials", { handle: { equals: item.handle } })) continue;
    await payload.create({
      collection: "testimonials",
      overrideAccess: true,
      data: { handle: item.handle, text: item.text, url: item.url, visible: item.visible, order: index + 1 },
    });
    saved.push(`témoignage ${item.handle}`);
  }

  for (const item of faqSeed) {
    if (await existing(payload, "faq-items", { question: { equals: item.question } })) continue;
    await payload.create({ collection: "faq-items", overrideAccess: true, data: item });
    saved.push("faq");
  }

  for (const band of resultBandsSeed) {
    if (await existing(payload, "diagnostic-results", { minScore: { equals: band.minScore } })) continue;
    await payload.create({ collection: "diagnostic-results", overrideAccess: true, data: band });
    saved.push(`résultat ${band.minScore}–${band.maxScore}`);
  }

  for (const page of legalSeed) {
    if (await existing(payload, "legal-pages", { slug: { equals: page.slug } })) continue;
    await payload.create({
      collection: "legal-pages",
      overrideAccess: true,
      data: {
        title: page.title,
        slug: page.slug,
        eyebrow: page.eyebrow,
        lead: page.lead,
        content: page.blocks.map(contentBlock),
        seo: page.seo,
        _status: "published",
      },
    });
    saved.push(page.slug);
  }

  const wav = silentWav();
  for (const audio of audiosSeed) {
    if (await existing(payload, "diagnostic-audios", { order: { equals: audio.order } })) continue;
    await payload.create({
      collection: "diagnostic-audios",
      overrideAccess: true,
      data: { title: audio.title, order: audio.order, isActive: true },
      file: { data: wav, mimetype: "audio/wav", name: `detection-${audio.order}.wav`, size: wav.length },
    });
    saved.push(audio.title);
  }

  return saved;
}

const payload = await getPayload({ config });
try {
  const saved = await seed(payload);
  console.log(saved.length ? `Enregistré : ${saved.join(", ")}` : "Déjà enregistré, rien à ajouter.");
} finally {
  await payload.destroy();
}
