import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Images" },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    imageSizes: [{ name: "card", width: 1200, height: 800, fit: "cover" }],
  },
  fields: [{ name: "alt", label: "Texte alternatif", type: "text", required: true }],
};
