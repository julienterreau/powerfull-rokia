import type { CollectionConfig } from "payload";
import { signedIn } from "../access";
const MAX_DEPTH = 4;

function parentId(value: unknown) {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value && typeof value === "object" && "id" in value) return String((value as { id: unknown }).id);
  return null;
}

export const Guestbook: CollectionConfig = {
  slug: "guestbook",
  labels: { singular: "Avis", plural: "Livre d'or" },
  admin: { useAsTitle: "authorName", defaultColumns: ["authorName", "fromClient", "createdAt"] },
  defaultSort: "-createdAt",
  access: { read: () => true, create: () => true, update: signedIn, delete: signedIn },
  fields: [
    { name: "authorName", label: "Nom", type: "text", required: true },
    { name: "message", label: "Message", type: "textarea", required: true },
    { name: "parent", label: "Réponse à", type: "relationship", relationTo: "guestbook" },
    {
      name: "fromClient",
      label: "Réponse du site",
      type: "checkbox",
      defaultValue: false,
      access: { create: ({ req }) => Boolean(req.user), update: ({ req }) => Boolean(req.user) },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data) return data;
        data.authorName = String(data.authorName || "").trim().slice(0, 80);
        data.message = String(data.message || "").trim().slice(0, 2000);
        if (data.authorName.length < 2) throw new Error("Indiquez un nom.");
        if (data.message.length < 2) throw new Error("Écrivez quelques mots.");
        const parent = parentId(data.parent);
        if (!parent) return data;
        let depth = 0;
        let current: string | null = parent;
        while (current) {
          depth += 1;
          if (depth > MAX_DEPTH) throw new Error("Cette réponse est trop imbriquée.");
          const doc = await req.payload.findByID({ collection: "guestbook", id: current, depth: 0, overrideAccess: true });
          current = parentId(doc.parent);
        }
        return data;
      },
    ],
  },
};

export const GuestbookReactions: CollectionConfig = {
  slug: "guestbook-reactions",
  labels: { singular: "Réaction", plural: "Réactions du livre d'or" },
  admin: { useAsTitle: "emoji", defaultColumns: ["emoji", "entry", "createdAt"] },
  access: { read: signedIn, create: () => false, update: () => false, delete: signedIn },
  fields: [
    { name: "entry", label: "Avis", type: "relationship", relationTo: "guestbook", required: true },
    { name: "emoji", label: "Emoji", type: "text", required: true },
    {
      name: "visitorId",
      label: "Visiteur",
      type: "text",
      required: true,
      access: { read: ({ req }) => Boolean(req.user) },
    },
  ],
};
