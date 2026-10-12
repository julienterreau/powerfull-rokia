import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Catégorie", plural: "Catégories" },
  admin: { useAsTitle: "name" },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: "name", label: "Nom", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true, unique: true },
    { name: "color", label: "Couleur", type: "text", defaultValue: "#EDE4D3" },
  ],
};
