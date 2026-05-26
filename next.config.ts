import type { NextConfig } from "next";

const wpUrl = process.env.WORDPRESS_API_URL
  ? new URL(process.env.WORDPRESS_API_URL)
  : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: wpUrl
      ? [{ protocol: wpUrl.protocol.replace(":", "") as "http" | "https", hostname: wpUrl.hostname }]
      : [],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap-index",
      },
    ];
  },
};

export default nextConfig;
