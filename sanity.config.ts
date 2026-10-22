import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureResolver } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "missing-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";

const singleton = (id: string, type: string, title: string) => (structure: Parameters<StructureResolver>[0]) =>
  structure.listItem().title(title).child(structure.document().schemaType(type).documentId(id).title(title));

export default defineConfig({
  name: "powerfull-rokia",
  title: "Powerfull Rokia",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (structure) =>
        structure
          .list()
          .title("Contenu")
          .items([
            singleton("site", "siteSettings", "E-mail")(structure),
            structure.divider(),
            structure.documentTypeListItem("article").title("Articles"),
            structure.documentTypeListItem("category").title("Catégories"),
            structure.documentTypeListItem("diagnosticAudio").title("Audios de diagnostic"),
            structure.documentTypeListItem("faqItem").title("FAQ"),
            structure.documentTypeListItem("legalPage").title("Pages légales"),
            structure.divider(),
            structure.documentTypeListItem("guestbookEntry").title("Livre d'or"),
            structure.documentTypeListItem("newsletterSubscriber").title("Newsletter"),
            structure.documentTypeListItem("diagnosticSubmission").title("Diagnostics envoyés"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
