import type { Block, Field } from "payload";
import { lines, linkGroup } from "../fields";

const eyebrow: Field = { name: "eyebrow", label: "Surtitre", type: "text" };
const title: Field = { name: "title", label: "Titre", type: "text", required: true };
const titleAccent: Field = { name: "titleAccent", label: "Accent doré", type: "text" };
const lead: Field = { name: "lead", label: "Texte", type: "textarea" };

function block(slug: string, label: string, fields: Field[]): Block {
  return { slug, labels: { singular: label, plural: label }, fields };
}

export const homeBlocks: Block[] = [
  block("hero", "Hero", [
    { name: "badge", label: "Badge", type: "text" },
    title,
    titleAccent,
    lead,
    { name: "forLabel", label: "Libellé des puces", type: "text" },
    lines("chips", "Puces"),
    linkGroup("primary", "Bouton principal"),
    linkGroup("secondary", "Bouton secondaire"),
    lines("guarantees", "Garanties"),
  ]),
  block("themes", "Bandeau de thèmes", [lines("items", "Thèmes")]),
  block("how", "Comment ça marche", [
    eyebrow,
    title,
    titleAccent,
    lead,
    {
      name: "steps",
      label: "Étapes",
      type: "array",
      maxRows: 4,
      fields: [
        { name: "number", label: "Numéro", type: "text" },
        { name: "title", label: "Titre", type: "text", required: true },
        { name: "text", label: "Texte", type: "textarea" },
        { name: "linkLabel", label: "Lien", type: "text" },
        { name: "url", label: "URL", type: "text" },
      ],
    },
  ]),
  block("diagnostic", "Teaser diagnostic", [
    eyebrow,
    title,
    titleAccent,
    lead,
    lines("checks", "Points"),
    linkGroup("cta", "Bouton"),
    { name: "previewTitle", label: "Titre de l'aperçu", type: "text" },
    { name: "openLabel", label: "Libellé d'ouverture", type: "text" },
    { name: "moreLabel", label: "Libellé « plus »", type: "text" },
  ]),
  block("videos", "Dernières vidéos", [eyebrow, title, titleAccent, lead, linkGroup("cta", "Bouton"), { name: "limit", label: "Nombre", type: "number", defaultValue: 4 }]),
  block("why", "Pourquoi", [
    eyebrow,
    title,
    titleAccent,
    lead,
    linkGroup("cta", "Bouton"),
    {
      name: "features",
      label: "Arguments",
      type: "array",
      maxRows: 3,
      fields: [
        {
          name: "icon",
          label: "Icône",
          type: "select",
          options: [
            { label: "Bouclier", value: "shield" },
            { label: "Livre", value: "book" },
            { label: "Cœur", value: "heart" },
          ],
        },
        { name: "title", label: "Titre", type: "text", required: true },
        { name: "text", label: "Texte", type: "textarea" },
      ],
    },
  ]),
  block("highlight", "Article mis en avant", [
    eyebrow,
    title,
    titleAccent,
    { name: "text", label: "Texte", type: "textarea" },
    { name: "ctaLabel", label: "Libellé du lien", type: "text" },
    { name: "ctaHref", label: "Lien", type: "text" },
  ]),
  block("blog", "Aperçu du blog", [eyebrow, title, titleAccent, linkGroup("cta", "Bouton"), { name: "limit", label: "Nombre", type: "number", defaultValue: 3 }]),
  block("testimonials", "Témoignages", [eyebrow, title, titleAccent, { name: "note", label: "Note", type: "text" }]),
  block("faq", "FAQ", [eyebrow, title, titleAccent, lead, linkGroup("cta", "Bouton"), { name: "limit", label: "Nombre", type: "number", defaultValue: 4 }]),
  block("podcast", "Podcast", [
    { name: "enabled", label: "Afficher", type: "checkbox", defaultValue: true },
    eyebrow,
    title,
    titleAccent,
    { name: "titleAfter", label: "Suite du titre", type: "text" },
    lead,
    { name: "placeholder", label: "Placeholder", type: "text" },
    { name: "button", label: "Bouton", type: "text" },
    { name: "note", label: "Note", type: "text" },
  ]),
  block("verse", "Verset", [
    { name: "arabic", label: "Arabe", type: "textarea", required: true },
    { name: "translation", label: "Traduction", type: "textarea", required: true },
    { name: "reference", label: "Référence", type: "text", required: true },
  ]),
];
