import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";

export const Videos: CollectionConfig = {
  slug: "videos",
  labels: { singular: "Vidéo", plural: "Vidéos" },
  admin: { useAsTitle: "title" },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  versions: { drafts: true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "youtubeUrl", label: "URL YouTube", type: "text", required: true },
    { name: "duration", label: "Durée", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "category", label: "Catégorie", type: "relationship", relationTo: "categories" },
    { name: "thumbnail", label: "Miniature", type: "upload", relationTo: "media" },
    { name: "gradient", label: "Fond de secours", type: "text", defaultValue: "#0F3D33" },
    { name: "featured", label: "À la une", type: "checkbox", defaultValue: false },
    { name: "publishedAt", label: "Date", type: "date" },
  ],
};
