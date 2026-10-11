import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const src = join(import.meta.dirname, "..", "src");

function write(file, data) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, typeof data === "string" ? data : JSON.stringify(data, null, 2));
}

function component(category, name, displayName, attributes, icon = "cube") {
  write(join(src, "components", category, `${name}.json`), {
    collectionName: `components_${category.replace(/-/g, "_")}_${name.replace(/-/g, "_")}s`,
    info: { displayName, icon },
    attributes,
  });
}

function api(name, { kind, displayName, attributes, draft = false }) {
  const plurals = { category: "categories" };
  const plural = plurals[name] || (name.endsWith("s") ? name : `${name}s`);
  const singular = name;
  write(join(src, "api", singular, "content-types", singular, "schema.json"), {
    kind,
    collectionName: plural.replace(/-/g, "_"),
    info: { singularName: singular, pluralName: plural, displayName },
    options: { draftAndPublish: draft },
    attributes,
  });
  const uid = `api::${singular}.${singular}`;
  const factory = (method) => `import { factories } from '@strapi/strapi';\n\nexport default factories.${method}('${uid}');\n`;
  write(join(src, "api", singular, "controllers", `${singular}.ts`), factory("createCoreController"));
  write(join(src, "api", singular, "routes", `${singular}.ts`), factory("createCoreRouter"));
  write(join(src, "api", singular, "services", `${singular}.ts`), factory("createCoreService"));
}

const text = { type: "string", required: true };
const long = { type: "text", required: true };
const link = { type: "component", repeatable: true, component: "shared.link" };
const seo = { type: "component", repeatable: false, component: "shared.seo" };

component("shared", "seo", "SEO", {
  metaTitle: text,
  metaDescription: long,
  ogImage: { type: "media", multiple: false, allowedTypes: ["images"] },
});
component("shared", "link", "Lien", { label: text, url: text });
component("shared", "button", "Bouton", {
  label: text,
  url: text,
  variant: { type: "enumeration", enum: ["primary", "gold", "outline", "white", "outline-light"], default: "primary" },
});
component("shared", "section-header", "En-tête de section", {
  eyebrow: { type: "string" },
  title: text,
  titleAccent: { type: "string" },
  lead: { type: "text" },
});
component("shared", "stat", "Chiffre", { value: text, label: text });
component("shared", "step", "Étape", { number: text, title: text, text: long, linkLabel: { type: "string" }, url: { type: "string" } });
component("shared", "value", "Valeur", { number: text, title: text, text: long });
component("shared", "feature", "Atout", {
  icon: { type: "enumeration", enum: ["shield", "book", "heart"], default: "shield" },
  title: text,
  text: long,
});
component("shared", "text-line", "Ligne de texte", { text: text });
component("blocks", "paragraph", "Paragraphe", { text: long }, "align-left");
component("blocks", "heading", "Intertitre", { text: text }, "heading");
component("blocks", "quote", "Citation", { text: long }, "quote");
component("blocks", "verse", "Verset", { arabic: text, translation: long, reference: text }, "book");
component("blocks", "youtube", "Vidéo YouTube", { url: text, title: text }, "play");
component("blocks", "note", "Encadré", { text: long }, "information");

component("home", "hero", "Accueil — Hero", {
  badge: text,
  title: text,
  titleAccent: text,
  lead: long,
  forLabel: text,
  chips: { type: "component", repeatable: true, component: "shared.text-line" },
  primary: { type: "component", repeatable: false, component: "shared.button" },
  secondary: { type: "component", repeatable: false, component: "shared.button" },
  guarantees: { type: "component", repeatable: true, component: "shared.text-line" },
});
component("home", "themes-strip", "Accueil — Thèmes", {
  items: { type: "component", repeatable: true, component: "shared.text-line" },
});
component("home", "how-it-works", "Accueil — Comment ça marche", {
  header: { type: "component", repeatable: false, component: "shared.section-header" },
  steps: { type: "component", repeatable: true, component: "shared.step" },
});
component("home", "diagnostic-teaser", "Accueil — Teaser diagnostic", {
  header: { type: "component", repeatable: false, component: "shared.section-header" },
  checks: { type: "component", repeatable: true, component: "shared.text-line" },
  cta: { type: "component", repeatable: false, component: "shared.button" },
  previewTitle: text,
  openLabel: text,
  moreLabel: text,
});
component("home", "latest-videos", "Accueil — Vidéos", {
  header: { type: "component", repeatable: false, component: "shared.section-header" },
  cta: { type: "component", repeatable: false, component: "shared.button" },
  limit: { type: "integer", default: 3 },
});
component("home", "why-us", "Accueil — Pourquoi", {
  header: { type: "component", repeatable: false, component: "shared.section-header" },
  features: { type: "component", repeatable: true, component: "shared.feature" },
});
component("home", "blog-preview", "Accueil — Blog", {
  header: { type: "component", repeatable: false, component: "shared.section-header" },
  cta: { type: "component", repeatable: false, component: "shared.button" },
  limit: { type: "integer", default: 3 },
});
component("home", "testimonials", "Accueil — Témoignages", {
  header: { type: "component", repeatable: false, component: "shared.section-header" },
  note: long,
});
component("home", "faq-preview", "Accueil — FAQ", {
  header: { type: "component", repeatable: false, component: "shared.section-header" },
  cta: { type: "component", repeatable: false, component: "shared.button" },
  limit: { type: "integer", default: 4 },
});
component("home", "podcast", "Accueil — Podcast", {
  enabled: { type: "boolean", default: false },
  eyebrow: text,
  title: text,
  titleAccent: text,
  titleAfter: { type: "string" },
  lead: long,
  placeholder: text,
  button: text,
  note: text,
});
component("home", "verse", "Accueil — Verset", { arabic: text, translation: long, reference: text });
component("sections", "text-highlight", "Section — Texte mis en avant", {
  eyebrow: { type: "string" },
  title: text,
  titleAccent: { type: "string" },
  text: { type: "richtext", required: true },
  ctaLabel: text,
  ctaHref: text,
});

const homeSections = {
  type: "dynamiczone",
  components: [
    "home.hero",
    "home.themes-strip",
    "home.how-it-works",
    "home.diagnostic-teaser",
    "home.latest-videos",
    "home.why-us",
    "sections.text-highlight",
    "home.blog-preview",
    "home.testimonials",
    "home.faq-preview",
    "home.podcast",
    "home.verse",
  ],
};

api("global", {
  kind: "singleType",
  displayName: "Global",
  attributes: {
    siteName: text,
    baseline: long,
    email: { type: "email", required: true },
    youtubeUrl: text,
    youtubeHandle: text,
    disclaimer: { type: "text", required: true, minLength: 20 },
    callWidgetEnabled: { type: "boolean", default: true },
    menu: link,
    discover: link,
    aboutLinks: link,
    legal: link,
    seo,
  },
});

api("home", { kind: "singleType", displayName: "Accueil", draft: true, attributes: { seo, sections: homeSections } });
api("about-page", {
  kind: "singleType",
  displayName: "Page À propos",
  draft: true,
  attributes: {
    seo,
    crumb: text,
    eyebrow: text,
    title: text,
    titleAccent: { type: "string" },
    titleAfter: { type: "string" },
    lead: long,
    storyEyebrow: text,
    storyTitle: text,
    storyAccent: { type: "string" },
    story: { type: "richtext" },
    storyCta: { type: "component", repeatable: false, component: "shared.button" },
    photo: { type: "media", multiple: false, allowedTypes: ["images"], required: false },
    photoAlt: { type: "string", required: true },
    photoLabel: text,
    stats: { type: "component", repeatable: true, component: "shared.stat" },
    valuesEyebrow: text,
    valuesTitle: text,
    valuesAccent: { type: "string" },
    values: { type: "component", repeatable: true, component: "shared.value" },
    disclaimerTitle: text,
    disclaimer: long,
    ctaTitle: text,
    ctaLead: long,
    ctaPrimary: { type: "component", repeatable: false, component: "shared.button" },
    ctaSecondary: { type: "component", repeatable: false, component: "shared.button" },
  },
});
api("diagnostic-page", {
  kind: "singleType",
  displayName: "Page Diagnostic",
  draft: true,
  attributes: {
    seo,
    crumb: text,
    eyebrow: text,
    title: text,
    titleAccent: { type: "string" },
    lead: long,
    guarantees: { type: "component", repeatable: true, component: "shared.text-line" },
    tipsEyebrow: text,
    tipsTitle: text,
    tipsAccent: { type: "string" },
    tips: { type: "component", repeatable: true, component: "shared.step" },
    toolEyebrow: text,
    toolTitle: text,
    toolAccent: { type: "string" },
    nameLabel: text,
    emailLabel: text,
    progressLabel: text,
    yesLabel: text,
    noLabel: text,
    submitLabel: text,
    confidential: text,
  },
});
api("blog-page", {
  kind: "singleType",
  displayName: "Page Blog",
  draft: true,
  attributes: {
    seo,
    crumb: text,
    eyebrow: text,
    title: text,
    titleAccent: { type: "string" },
    lead: long,
    readLabel: text,
    featuredLabel: text,
    loadMore: text,
    newsletterTitle: text,
    newsletterText: long,
    newsletterPlaceholder: text,
    newsletterButton: text,
    empty: text,
  },
});
api("videos-page", {
  kind: "singleType",
  displayName: "Page Vidéos",
  draft: true,
  attributes: {
    seo,
    crumb: text,
    eyebrow: text,
    title: text,
    titleAccent: { type: "string" },
    lead: long,
    latestLabel: text,
    watchLabel: text,
    allLabel: text,
    allUrl: text,
    bannerTitle: text,
    bannerText: long,
    bannerCta: { type: "component", repeatable: false, component: "shared.button" },
    filters: { type: "component", repeatable: true, component: "shared.text-line" },
  },
});
api("contact-page", {
  kind: "singleType",
  displayName: "Page Contact",
  draft: true,
  attributes: {
    seo,
    crumb: text,
    eyebrow: text,
    title: text,
    titleAccent: { type: "string" },
    lead: long,
    formTitle: text,
    consent: long,
    submit: text,
    success: long,
    faqEyebrow: text,
    faqTitle: text,
    faqAccent: { type: "string" },
  },
});
api("podcast", {
  kind: "singleType",
  displayName: "Podcast",
  attributes: {
    enabled: { type: "boolean", default: false, required: true },
    title: text,
    text: long,
    plannedDate: { type: "date" },
  },
});

api("category", {
  kind: "collectionType",
  displayName: "Catégorie",
  attributes: { name: text, slug: { type: "uid", targetField: "name", required: true }, color: { type: "string", default: "#EDE4D3" } },
});
api("article", {
  kind: "collectionType",
  displayName: "Article",
  draft: true,
  attributes: {
    title: text,
    slug: { type: "uid", targetField: "title", required: true },
    excerpt: long,
    cover: { type: "media", multiple: false, allowedTypes: ["images"] },
    coverAlt: { type: "string", required: true },
    category: { type: "relation", relation: "manyToOne", target: "api::category.category" },
    content: { type: "dynamiczone", components: ["blocks.paragraph", "blocks.heading", "blocks.quote", "blocks.verse", "blocks.youtube", "blocks.note"] },
    featured: { type: "boolean", default: false },
    author: { type: "string", default: "Powerfull Rokia" },
    seo,
  },
});
api("video", {
  kind: "collectionType",
  displayName: "Vidéo",
  draft: true,
  attributes: {
    title: text,
    youtubeUrl: text,
    duration: text,
    category: { type: "string" },
    thumbnail: { type: "media", multiple: false, allowedTypes: ["images"] },
    featured: { type: "boolean", default: false },
    description: { type: "text" },
  },
});
api("testimonial", {
  kind: "collectionType",
  displayName: "Témoignage",
  attributes: {
    handle: text,
    text: long,
    url: text,
    isVisible: { type: "boolean", default: true },
  },
});
api("faq-item", {
  kind: "collectionType",
  displayName: "Question FAQ",
  attributes: {
    question: text,
    answer: { type: "richtext", required: true },
    order: { type: "integer", required: true, default: 1 },
    showOnHome: { type: "boolean", default: false },
  },
});
api("diagnostic-audio", {
  kind: "collectionType",
  displayName: "Audio du diagnostic",
  attributes: {
    order: { type: "integer", required: true, unique: true, min: 1, max: 20 },
    title: text,
    audio: { type: "media", multiple: false, allowedTypes: ["audios"] },
    isActive: { type: "boolean", default: true },
  },
});
api("diagnostic-result", {
  kind: "collectionType",
  displayName: "Résultat du diagnostic",
  attributes: {
    minScore: { type: "integer", required: true },
    maxScore: { type: "integer", required: true },
    title: text,
    text: { type: "richtext", required: true },
    recommendedVideos: { type: "relation", relation: "manyToMany", target: "api::video.video" },
  },
});
api("diagnostic-submission", {
  kind: "collectionType",
  displayName: "Réponse au diagnostic",
  attributes: {
    name: text,
    email: { type: "email", required: true },
    answers: { type: "json", required: true },
    score: { type: "integer", required: true },
    submittedAt: { type: "datetime" },
  },
});
api("contact-message", {
  kind: "collectionType",
  displayName: "Message de contact",
  attributes: {
    name: text,
    email: { type: "email", required: true },
    subject: text,
    message: long,
    consent: { type: "boolean", required: true },
  },
});
api("newsletter-subscriber", {
  kind: "collectionType",
  displayName: "Inscrit newsletter",
  attributes: {
    email: { type: "email", required: true, unique: true },
    source: { type: "string" },
  },
});
api("legal-page", {
  kind: "collectionType",
  displayName: "Page légale",
  draft: true,
  attributes: {
    title: text,
    slug: { type: "uid", targetField: "title", required: true },
    eyebrow: text,
    lead: long,
    body: { type: "richtext", required: true },
    seo,
  },
});

console.log("schemas written");
