import type { Field } from "payload";

const variants = [
  { label: "Vert", value: "primary" },
  { label: "Or", value: "gold" },
  { label: "Contour", value: "outline" },
  { label: "Blanc", value: "white" },
  { label: "Contour clair", value: "outline-light" },
];

export const seoFields: Field[] = [
  { name: "metaTitle", label: "Titre SEO", type: "text", required: true, maxLength: 90 },
  { name: "metaDescription", label: "Description SEO", type: "textarea", required: true, maxLength: 220 },
];

export function linkGroup(name: string, label: string): Field {
  return {
    name,
    label,
    type: "group",
    fields: [
      { name: "label", label: "Libellé", type: "text", required: true },
      { name: "url", label: "Lien", type: "text", required: true },
      { name: "variant", label: "Style", type: "select", defaultValue: "primary", options: variants },
    ],
  };
}

export function linkArray(name: string, label: string): Field {
  return {
    name,
    label,
    type: "array",
    fields: [
      { name: "label", label: "Libellé", type: "text", required: true },
      { name: "url", label: "Lien", type: "text", required: true },
    ],
  };
}

export function lines(name: string, label: string): Field {
  return {
    name,
    label,
    type: "array",
    fields: [{ name: "label", label: "Texte", type: "text", required: true }],
  };
}
