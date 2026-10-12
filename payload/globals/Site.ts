import type { GlobalConfig } from "payload";
import { signedIn } from "../access";
import { linkArray, seoFields } from "../fields";

export const Site: GlobalConfig = {
  slug: "site",
  label: "Site",
  access: { read: () => true, update: signedIn },
  fields: [
    { name: "siteName", label: "Nom du site", type: "text", required: true },
    { name: "baseline", label: "Baseline", type: "textarea", required: true },
    { name: "email", label: "E-mail", type: "email", required: true },
    { name: "youtubeUrl", label: "URL YouTube", type: "text", required: true },
    { name: "youtubeHandle", label: "Chaîne YouTube", type: "text", required: true },
    { name: "disclaimer", label: "Mention", type: "textarea" },
    { name: "callWidgetEnabled", label: "Bouton d'appel", type: "checkbox", defaultValue: true },
    { name: "logo", label: "Logo", type: "upload", relationTo: "media" },
    linkArray("menu", "Menu"),
    linkArray("discover", "Pied de page — découvrir"),
    linkArray("aboutLinks", "Pied de page — à propos"),
    linkArray("legal", "Pied de page — légal"),
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
  ],
};
