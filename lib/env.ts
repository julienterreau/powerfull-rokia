import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  REVALIDATE_SECRET: z.string().optional().default(""),
  NEXT_PUBLIC_WEBCALLHUB_ID: z.string().optional().default(""),
});

export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  NEXT_PUBLIC_WEBCALLHUB_ID: process.env.NEXT_PUBLIC_WEBCALLHUB_ID,
});
