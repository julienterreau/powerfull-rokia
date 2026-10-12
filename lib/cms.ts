import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let client: Promise<Payload> | null = null;

export function payloadClient() {
  client ??= getPayload({ config });
  return client;
}
