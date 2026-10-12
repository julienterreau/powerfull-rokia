import { getPayload, type Payload } from "payload";

let client: Promise<Payload> | null = null;

export function payloadClient() {
  if (!process.env.DATABASE_URL?.trim()) {
    return Promise.reject(new Error("DATABASE_URL is not set"));
  }
  client ??= import("@payload-config").then((mod) => getPayload({ config: mod.default }));
  return client;
}
