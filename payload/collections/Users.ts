import type { CollectionConfig } from "payload";

function isAdmin(user: unknown) {
  return Boolean(user && typeof user === "object" && "role" in user && (user as { role?: string }).role === "admin");
}

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Compte", plural: "Comptes" },
  admin: { useAsTitle: "email" },
  auth: true,
  fields: [
    {
      name: "role",
      label: "Rôle",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      access: { update: ({ req }) => isAdmin(req.user) },
      options: [
        { label: "Administrateur", value: "admin" },
        { label: "Éditeur", value: "editor" },
      ],
    },
  ],
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => isAdmin(req.user),
    update: ({ req, id }) => isAdmin(req.user) || (id != null && String(req.user?.id) === String(id)),
    delete: ({ req }) => isAdmin(req.user),
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (!data || operation !== "create") return data;
        const existing = await req.payload.count({ collection: "users", overrideAccess: true, req });
        if (existing.totalDocs === 0) data.role = "admin";
        return data;
      },
    ],
  },
};
