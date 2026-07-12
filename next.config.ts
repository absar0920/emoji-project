import type { NextConfig } from "next";

const wpUrl = process.env.WORDPRESS_API_URL
  ? new URL(process.env.WORDPRESS_API_URL)
  : null;

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root to this project. Without this, a stray
  // lockfile in a parent directory makes Turbopack infer the wrong root and
  // watch the entire home folder, spiking CPU/RAM in dev.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      ...(wpUrl
        ? [{ protocol: wpUrl.protocol.replace(":", "") as "http" | "https", hostname: wpUrl.hostname }]
        : []),
    ],
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
