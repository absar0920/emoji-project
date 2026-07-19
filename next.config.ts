import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle (.next/standalone) so the Docker
  // runtime image can drop node_modules and ship just server.js + the minimal
  // traced deps. See Dockerfile.
  output: "standalone",
  // Let Caddy do compression. Next's built-in gzip otherwise pre-encodes every
  // response, so Caddy (configured `encode zstd gzip`) sees already-gzipped bytes
  // and passes them through instead of applying zstd — which compresses the
  // ~346KB HTML document noticeably better. With this off, Caddy serves zstd to
  // browsers that support it (Chrome) and falls back to gzip otherwise.
  compress: false,
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
