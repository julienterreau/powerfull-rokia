import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  STRAPI_URL: z.string().url().optional().or(z.literal("")),
  STRAPI_API_TOKEN: z.string().optional().default(""),
  STRAPI_PREVIEW_SECRET: z.string().optional().default(""),
  REVALIDATE_SECRET: z.string().optional().default(""),
  NEXT_PUBLIC_WEBCALLHUB_ID: z.string().optional().default(""),
});

export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  STRAPI_URL: process.env.STRAPI_URL,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  STRAPI_PREVIEW_SECRET: process.env.STRAPI_PREVIEW_SECRET,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  NEXT_PUBLIC_WEBCALLHUB_ID: process.env.NEXT_PUBLIC_WEBCALLHUB_ID,
});

export function strapiEnabled() {
  return Boolean(env.STRAPI_URL && env.STRAPI_API_TOKEN);
}
