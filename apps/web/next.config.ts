import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL;
let strapiPattern: { protocol: "http" | "https"; hostname: string; port?: string; pathname: string }[] = [];

if (strapiUrl) {
  try {
    const url = new URL(strapiUrl);
    strapiPattern = [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || undefined,
        pathname: "/uploads/**",
      },
    ];
  } catch {
    strapiPattern = [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      { protocol: "https", hostname: "i.ytimg.com" },
      ...strapiPattern,
    ],
  },
};

export default nextConfig;
