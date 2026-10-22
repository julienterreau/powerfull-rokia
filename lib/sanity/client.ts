import { createClient, type SanityClient } from "@sanity/client";

export const sanityProjectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const sanityDataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = process.env.SANITY_API_VERSION || "2026-10-22";
export const sanityApiToken = process.env.SANITY_API_TOKEN || "";

export function sanityConfigured() {
  return Boolean(sanityProjectId && sanityDataset && sanityApiToken);
}

let client: SanityClient | null = null;

export function sanityClient() {
  if (!sanityConfigured()) throw new Error("Sanity n'est pas configuré. Renseignez SANITY_PROJECT_ID, SANITY_DATASET et SANITY_API_TOKEN.");
  client ??= createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    token: sanityApiToken,
    useCdn: false,
  });
  return client;
}
