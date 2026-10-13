import { s3Storage } from "@payloadcms/storage-s3";
import type { Plugin } from "payload";

function publicFiles(collectionPrefix: string) {
  return {
    prefix: collectionPrefix,
    disablePayloadAccessControl: true as const,
    generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) => {
      const base = (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");
      // Client uploads land in `audio/<id>/file.mp3`, not `audio/file.mp3`.
      const folder = (prefix || collectionPrefix).replace(/^\/+|\/+$/g, "");
      const path = `${folder}/${filename}`
        .split("/")
        .filter(Boolean)
        .map((part) => encodeURIComponent(part))
        .join("/");
      return `${base}/${path}`;
    },
  };
}

export function r2Storage(): Plugin {
  const enabled = Boolean(process.env.R2_BUCKET && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY);
  return s3Storage({
    enabled,
    clientUploads: enabled,
    collections: {
      media: publicFiles("images"),
      "diagnostic-audios": publicFiles("audio"),
    },
    bucket: process.env.R2_BUCKET || "powerfullrokia-media",
    config: {
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
      },
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      forcePathStyle: true,
    },
  });
}
