import type { GlobalConfig } from "payload";
import { signedIn } from "../access";
import { homeBlocks } from "../blocks/home";
import { lines, linkGroup, seoFields } from "../fields";

const editable = { read: () => true, update: signedIn };

export const Home: GlobalConfig = {
  slug: "home",
  label: "Accueil",
  access: editable,
  fields: [
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
    { name: "sections", label: "Sections", type: "blocks", blocks: homeBlocks },
  ],
};

export const About: GlobalConfig = {
  slug: "about",
  label: "À propos",
  access: editable,
  fields: [
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
    { name: "crumb", label: "Fil d'Ariane", type: "text", required: true },
    { name: "eyebrow", label: "Surtitre", type: "text" },
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "titleAccent", label: "Accent", type: "text" },
    { name: "titleAfter", label: "Suite du titre", type: "text" },
    { name: "lead", label: "Introduction", type: "textarea" },
    { name: "storyEyebrow", label: "Histoire — surtitre", type: "text" },
    { name: "storyTitle", label: "Histoire — titre", type: "text" },
    { name: "storyAccent", label: "Histoire — accent", type: "text" },
    { name: "story", label: "Histoire", type: "array", fields: [{ name: "text", label: "Paragraphe", type: "textarea", required: true }] },
    linkGroup("storyCta", "Histoire — bouton"),
    { name: "photo", label: "Photo", type: "upload", relationTo: "media" },
    { name: "photoLabel", label: "Légende photo", type: "text" },
    {
      name: "stats",
      label: "Chiffres",
      type: "array",
      maxRows: 3,
      fields: [
        { name: "value", label: "Valeur", type: "text", required: true },
        { name: "label", label: "Libellé", type: "text", required: true },
      ],
    },
    { name: "valuesEyebrow", label: "Valeurs — surtitre", type: "text" },
    { name: "valuesTitle", label: "Valeurs — titre", type: "text" },
    { name: "valuesAccent", label: "Valeurs — accent", type: "text" },
    {
      name: "values",
      label: "Valeurs",
      type: "array",
      fields: [
        { name: "number", label: "Numéro", type: "text" },
        { name: "title", label: "Titre", type: "text", required: true },
        { name: "text", label: "Texte", type: "textarea" },
      ],
    },
    { name: "disclaimerTitle", label: "Mention — titre", type: "text" },
    { name: "disclaimer", label: "Mention", type: "textarea" },
    { name: "ctaTitle", label: "Appel — titre", type: "text" },
    { name: "ctaLead", label: "Appel — texte", type: "textarea" },
    linkGroup("ctaPrimary", "Appel — bouton principal"),
    linkGroup("ctaSecondary", "Appel — bouton secondaire"),
  ],
};

export const DiagnosticPage: GlobalConfig = {
  slug: "diagnostic-page",
  label: "Page diagnostic",
  access: editable,
  fields: [
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
    { name: "crumb", label: "Fil d'Ariane", type: "text", required: true },
    { name: "eyebrow", label: "Surtitre", type: "text" },
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "titleAccent", label: "Accent", type: "text" },
    { name: "lead", label: "Introduction", type: "textarea" },
    lines("guarantees", "Garanties"),
    { name: "tipsEyebrow", type: "text", label: "Conseils — surtitre" },
    { name: "tipsTitle", type: "text", label: "Conseils — titre" },
    { name: "tipsAccent", type: "text", label: "Conseils — accent" },
    {
      name: "tips",
      label: "Conseils",
      type: "array",
      maxRows: 4,
      fields: [
        { name: "number", type: "text", label: "Numéro" },
        { name: "title", type: "text", label: "Titre", required: true },
        { name: "text", type: "textarea", label: "Texte" },
      ],
    },
    { name: "toolEyebrow", type: "text", label: "Outil — surtitre" },
    { name: "toolTitle", type: "text", label: "Outil — titre" },
    { name: "toolAccent", type: "text", label: "Outil — accent" },
    { name: "nameLabel", type: "text", label: "Libellé nom" },
    { name: "emailLabel", type: "text", label: "Libellé e-mail" },
    { name: "progressLabel", type: "text", label: "Libellé progression" },
    { name: "yesLabel", type: "text", label: "Libellé oui" },
    { name: "noLabel", type: "text", label: "Libellé non" },
    { name: "submitLabel", type: "text", label: "Libellé envoi" },
    { name: "confidential", type: "textarea", label: "Confidentialité" },
    { name: "moreLabel", type: "text", label: "Libellé suite" },
    { name: "resultNote", type: "textarea", label: "Note de résultat" },
  ],
};

export const BlogPage: GlobalConfig = {
  slug: "blog-page",
  label: "Page blog",
  access: editable,
  fields: [
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
    { name: "crumb", type: "text", label: "Fil d'Ariane" },
    { name: "eyebrow", type: "text", label: "Surtitre" },
    { name: "title", type: "text", label: "Titre", required: true },
    { name: "titleAccent", type: "text", label: "Accent" },
    { name: "lead", type: "textarea", label: "Introduction" },
    { name: "readLabel", type: "text", label: "Libellé lecture" },
    { name: "featuredLabel", type: "text", label: "Libellé à la une" },
    { name: "loadMore", type: "text", label: "Libellé voir plus" },
    { name: "newsletterTitle", type: "text", label: "Newsletter — titre" },
    { name: "newsletterText", type: "textarea", label: "Newsletter — texte" },
    { name: "newsletterPlaceholder", type: "text", label: "Newsletter — placeholder" },
    { name: "newsletterButton", type: "text", label: "Newsletter — bouton" },
    { name: "empty", type: "text", label: "Message vide" },
  ],
};

export const VideosPage: GlobalConfig = {
  slug: "videos-page",
  label: "Page vidéos",
  access: editable,
  fields: [
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
    { name: "crumb", type: "text", label: "Fil d'Ariane" },
    { name: "eyebrow", type: "text", label: "Surtitre" },
    { name: "title", type: "text", label: "Titre", required: true },
    { name: "titleAccent", type: "text", label: "Accent" },
    { name: "lead", type: "textarea", label: "Introduction" },
    { name: "latestLabel", type: "text", label: "Libellé dernières" },
    { name: "watchLabel", type: "text", label: "Libellé regarder" },
    { name: "allLabel", type: "text", label: "Libellé tout" },
    { name: "allUrl", type: "text", label: "Lien tout" },
    { name: "bannerTitle", type: "text", label: "Bannière — titre" },
    { name: "bannerText", type: "textarea", label: "Bannière — texte" },
    linkGroup("bannerCta", "Bannière — bouton"),
    lines("filters", "Filtres"),
  ],
};

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Page contact",
  access: editable,
  fields: [
    { name: "seo", label: "SEO", type: "group", fields: seoFields },
    { name: "crumb", type: "text", label: "Fil d'Ariane" },
    { name: "eyebrow", type: "text", label: "Surtitre" },
    { name: "title", type: "text", label: "Titre", required: true },
    { name: "titleAccent", type: "text", label: "Accent" },
    { name: "lead", type: "textarea", label: "Introduction" },
    {
      name: "cards",
      label: "Cartes",
      type: "array",
      fields: [
        {
          name: "icon",
          type: "select",
          label: "Icône",
          options: [
            { label: "E-mail", value: "mail" },
            { label: "Téléphone", value: "phone" },
            { label: "Vidéo", value: "video" },
          ],
        },
        { name: "title", type: "text", label: "Titre", required: true },
        { name: "text", type: "textarea", label: "Texte" },
        { name: "label", type: "text", label: "Libellé" },
        { name: "url", type: "text", label: "Lien" },
        {
          name: "action",
          type: "select",
          label: "Action",
          defaultValue: "link",
          options: [
            { label: "Lien", value: "link" },
            { label: "Appel", value: "widget" },
          ],
        },
      ],
    },
    { name: "formTitle", type: "text", label: "Formulaire — titre" },
    { name: "nameLabel", type: "text", label: "Libellé nom" },
    { name: "emailLabel", type: "text", label: "Libellé e-mail" },
    { name: "subjectLabel", type: "text", label: "Libellé sujet" },
    { name: "messageLabel", type: "text", label: "Libellé message" },
    { name: "namePlaceholder", type: "text", label: "Placeholder nom" },
    { name: "emailPlaceholder", type: "text", label: "Placeholder e-mail" },
    { name: "subjectPlaceholder", type: "text", label: "Placeholder sujet" },
    { name: "messagePlaceholder", type: "text", label: "Placeholder message" },
    { name: "consent", type: "textarea", label: "Consentement" },
    { name: "submit", type: "text", label: "Bouton" },
    { name: "success", type: "text", label: "Message de succès" },
    { name: "faqEyebrow", type: "text", label: "FAQ — surtitre" },
    { name: "faqTitle", type: "text", label: "FAQ — titre" },
    { name: "faqAccent", type: "text", label: "FAQ — accent" },
  ],
};
