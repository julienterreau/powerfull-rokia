import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";

export const DiagnosticAudios: CollectionConfig = {
  slug: "diagnostic-audios",
  labels: { singular: "Audio de diagnostic", plural: "Audios de diagnostic" },
  admin: { useAsTitle: "title", defaultColumns: ["order", "title", "isActive"] },
  defaultSort: "order",
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  upload: {
    staticDir: "media/audio",
    mimeTypes: ["audio/mpeg", "audio/mp3", "audio/mp4", "audio/wav", "audio/x-m4a", "audio/aac", "audio/webm"],
  },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "order", label: "Ordre", type: "number", required: true, unique: true, min: 1, max: 20 },
    { name: "isActive", label: "Actif", type: "checkbox", defaultValue: true },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        if (!data?.isActive) return data;
        const active = await req.payload.count({
          collection: "diagnostic-audios",
          where: { isActive: { equals: true } },
        });
        const wasActive = Boolean(originalDoc?.isActive);
        if (!wasActive && active.totalDocs >= 20) {
          throw new Error("20 audios actifs maximum.");
        }
        return data;
      },
    ],
  },
};
