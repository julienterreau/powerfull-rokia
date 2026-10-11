import { z } from "zod";
import { env } from "./env";

type FetchOptions<T> = {
  schema: z.ZodType<T>;
  tags?: string[];
  revalidate?: number;
  preview?: boolean;
};

export class StrapiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StrapiError";
  }
}

export async function fetchStrapi<T>(path: string, { schema, tags = [], revalidate = 60, preview = false }: FetchOptions<T>): Promise<T> {
  if (!env.STRAPI_URL || !env.STRAPI_API_TOKEN) {
    throw new StrapiError("STRAPI_URL ou STRAPI_API_TOKEN manquant.");
  }

  const url = new URL(path.startsWith("http") ? path : `${env.STRAPI_URL}${path.startsWith("/") ? path : `/${path}`}`);
  if (preview) url.searchParams.set("status", "draft");

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${env.STRAPI_API_TOKEN}` },
    next: preview ? { revalidate: 0 } : { revalidate, tags },
    cache: preview ? "no-store" : undefined,
  });

  if (!response.ok) {
    throw new StrapiError(`Strapi ${response.status} sur ${url.pathname}`);
  }

  const json = (await response.json()) as { data?: unknown };
  const payload = json.data ?? json;
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    throw new StrapiError(`Contenu incomplet (${url.pathname}) : ${parsed.error.issues.map((issue) => issue.path.join(".")).join(", ")}`);
  }
  return parsed.data;
}

export async function postStrapi(path: string, body: unknown) {
  if (!env.STRAPI_URL || !env.STRAPI_API_TOKEN) {
    throw new StrapiError("STRAPI_URL ou STRAPI_API_TOKEN manquant.");
  }
  const response = await fetch(`${env.STRAPI_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: body }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new StrapiError(`Écriture Strapi refusée (${response.status}) ${detail.slice(0, 180)}`);
  }
  return response.json();
}
