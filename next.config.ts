import type { NextConfig } from "next";

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
