import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Témoignage", plural: "Témoignages" },
  admin: { useAsTitle: "handle", defaultColumns: ["handle", "visible", "order"] },
  defaultSort: "order",
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: "handle", label: "Pseudo", type: "text", required: true },
    { name: "text", label: "Texte", type: "textarea", required: true },
    { name: "url", label: "Lien du commentaire", type: "text" },
    { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    { name: "order", label: "Ordre", type: "number", defaultValue: 0 },
  ],
};

export const FaqItems: CollectionConfig = {
  slug: "faq-items",
  labels: { singular: "Question", plural: "FAQ" },
  admin: { useAsTitle: "question" },
  defaultSort: "order",
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: "question", label: "Question", type: "text", required: true },
    { name: "answer", label: "Réponse", type: "textarea", required: true },
    { name: "order", label: "Ordre", type: "number", defaultValue: 0 },
    { name: "showOnHome", label: "Afficher sur l'accueil", type: "checkbox", defaultValue: false },
  ],
};
