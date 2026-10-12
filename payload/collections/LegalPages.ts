import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { articleBlocks } from "./Articles";
import { seoFields } from "../fields";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  labels: { singular: "Page légale", plural: "Pages légales" },
  admin: { useAsTitle: "title" },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  versions: { drafts: true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true, unique: true },
    { name: "eyebrow", label: "Surtitre", type: "text" },
    { name: "lead", label: "Introduction", type: "textarea" },
    { name: "content", label: "Contenu", type: "blocks", blocks: [...articleBlocks] },
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
  ],
};
