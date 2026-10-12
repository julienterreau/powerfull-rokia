import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

function remoteMedia() {
  const raw = process.env.R2_PUBLIC_URL;
  if (!raw) return [];
  try {
    const url = new URL(raw);
    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }, ...remoteMedia()],
  },
};

export default withPayload(nextConfig);
