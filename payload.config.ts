import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { fr } from "@payloadcms/translations/languages/fr";
import fs from "fs";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Articles } from "./payload/collections/Articles";
import { Categories } from "./payload/collections/Categories";
import { DiagnosticAudios } from "./payload/collections/DiagnosticAudios";
import { Testimonials, FaqItems } from "./payload/collections/Editorial";
import { ContactMessages, DiagnosticResults, DiagnosticSubmissions, NewsletterSubscribers } from "./payload/collections/Inbox";
import { LegalPages } from "./payload/collections/LegalPages";
import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";
import { Videos } from "./payload/collections/Videos";
import { Site } from "./payload/globals/Site";
import { About, BlogPage, ContactPage, DiagnosticPage, Home, VideosPage } from "./payload/globals/pages";
import { r2Storage } from "./payload/storage";

const dirname = path.dirname(fileURLToPath(import.meta.url));

function localDatabase() {
  const dataDir = path.resolve(dirname, "data");
  fs.mkdirSync(dataDir, { recursive: true });
  const file = path.join(dataDir, "payload.sqlite").replace(/\\/g, "/");
  return sqliteAdapter({ client: { url: `file:${file}` } });
}

const database = process.env.DATABASE_URL
  ? postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URL },
      push: process.env.NODE_ENV !== "production",
    })
  : localDatabase();

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: "— Powerfull Rokia" },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    Users,
    Media,
    DiagnosticAudios,
    Categories,
    Articles,
    Videos,
    Testimonials,
    FaqItems,
    DiagnosticResults,
    DiagnosticSubmissions,
    ContactMessages,
    NewsletterSubscribers,
    LegalPages,
  ],
  globals: [Site, Home, About, DiagnosticPage, BlogPage, VideosPage, ContactPage],
  editor: lexicalEditor(),
  i18n: { supportedLanguages: { fr }, fallbackLanguage: "fr" },
  secret: process.env.PAYLOAD_SECRET || "developpement-local-uniquement",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: database,
  sharp,
  plugins: [r2Storage()],
});
