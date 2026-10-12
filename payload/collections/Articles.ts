import type { Block, CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { seoFields } from "../fields";

export const articleBlocks: Block[] = [
  { slug: "paragraph", labels: { singular: "Paragraphe", plural: "Paragraphes" }, fields: [{ name: "text", label: "Texte", type: "textarea", required: true }] },
  { slug: "heading", labels: { singular: "Titre", plural: "Titres" }, fields: [{ name: "text", label: "Texte", type: "text", required: true }] },
  { slug: "quote", labels: { singular: "Citation", plural: "Citations" }, fields: [{ name: "text", label: "Texte", type: "textarea", required: true }] },
  {
    slug: "verse",
    labels: { singular: "Verset", plural: "Versets" },
    fields: [
      { name: "arabic", label: "Arabe", type: "textarea" },
      { name: "translation", label: "Traduction", type: "textarea", required: true },
      { name: "reference", label: "Référence", type: "text" },
    ],
  },
  {
    slug: "youtube",
    labels: { singular: "YouTube", plural: "YouTube" },
    fields: [
      { name: "url", label: "URL", type: "text", required: true },
      { name: "title", label: "Titre", type: "text" },
    ],
  },
  { slug: "note", labels: { singular: "Encadré", plural: "Encadrés" }, fields: [{ name: "text", label: "Texte", type: "textarea", required: true }] },
];

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Article", plural: "Articles" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "featured", "publishedAt"] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  versions: { drafts: true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "excerpt", label: "Chapô", type: "textarea", required: true, maxLength: 200 },
    { name: "cover", label: "Image", type: "upload", relationTo: "media" },
    { name: "category", label: "Catégorie", type: "relationship", relationTo: "categories" },
    { name: "content", label: "Contenu", type: "blocks", blocks: articleBlocks },
    { name: "featured", label: "À la une", type: "checkbox", defaultValue: false },
    { name: "author", label: "Auteur", type: "text", defaultValue: "Powerfull Rokia" },
    { name: "publishedAt", label: "Date", type: "date", admin: { position: "sidebar" } },
    { name: "readingTime", label: "Minutes de lecture", type: "number", admin: { readOnly: true, position: "sidebar" } },
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data;
        if (data._status === "published" && !data.publishedAt) data.publishedAt = new Date().toISOString();
        const blocks = Array.isArray(data?.content) ? data.content : [];
        const words = blocks
          .flatMap((block: { text?: string; translation?: string; arabic?: string }) => [block.text, block.translation, block.arabic])
          .filter(Boolean)
          .join(" ")
          .split(/\s+/)
          .filter(Boolean).length;
        data.readingTime = Math.max(1, Math.round(words / 200));
        return data;
      },
    ],
  },
};
