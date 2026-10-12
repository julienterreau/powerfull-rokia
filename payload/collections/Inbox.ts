import type { CollectionConfig } from "payload";
import { signedIn } from "../access";

export const DiagnosticResults: CollectionConfig = {
  slug: "diagnostic-results",
  labels: { singular: "Tranche de résultat", plural: "Résultats du diagnostic" },
  admin: { useAsTitle: "title" },
  defaultSort: "minScore",
  access: { read: () => true, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: "minScore", label: "Score minimum", type: "number", required: true, min: 0, max: 20 },
    { name: "maxScore", label: "Score maximum", type: "number", required: true, min: 0, max: 20 },
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "text", label: "Texte", type: "textarea", required: true },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        const min = Number(data?.minScore);
        const max = Number(data?.maxScore);
        if (min > max) throw new Error("Le score minimum dépasse le score maximum.");
        const others = await req.payload.find({ collection: "diagnostic-results", limit: 50, pagination: false });
        const overlap = others.docs.some((band) => {
          if (band.id === originalDoc?.id) return false;
          return min <= band.maxScore && max >= band.minScore;
        });
        if (overlap) throw new Error("Cette tranche chevauche un résultat existant.");
        return data;
      },
    ],
  },
};

export const DiagnosticSubmissions: CollectionConfig = {
  slug: "diagnostic-submissions",
  labels: { singular: "Soumission", plural: "Soumissions du diagnostic" },
  admin: { useAsTitle: "email" },
  access: { read: signedIn, create: () => false, update: () => false, delete: signedIn },
  fields: [
    { name: "name", label: "Nom", type: "text", required: true },
    { name: "email", label: "E-mail", type: "email", required: true },
    { name: "answers", label: "Réponses", type: "json", required: true },
    { name: "score", label: "Score", type: "number", required: true },
    { name: "submittedAt", label: "Envoyé le", type: "date" },
  ],
};

export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  labels: { singular: "Message", plural: "Messages" },
  admin: { useAsTitle: "email" },
  access: { read: signedIn, create: () => false, update: () => false, delete: signedIn },
  fields: [
    { name: "name", label: "Nom", type: "text", required: true },
    { name: "email", label: "E-mail", type: "email", required: true },
    { name: "subject", label: "Sujet", type: "text" },
    { name: "message", label: "Message", type: "textarea", required: true },
    { name: "consent", label: "Consentement", type: "checkbox", required: true },
  ],
};

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  labels: { singular: "Abonné", plural: "Newsletter" },
  admin: { useAsTitle: "email" },
  access: { read: signedIn, create: () => false, update: () => false, delete: signedIn },
  fields: [
    { name: "email", label: "E-mail", type: "email", required: true, unique: true },
    {
      name: "source",
      label: "Origine",
      type: "select",
      defaultValue: "blog",
      options: [
        { label: "Blog", value: "blog" },
        { label: "Podcast", value: "podcast" },
      ],
    },
  ],
};
