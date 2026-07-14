# syntax=docker/dockerfile:1

# ---------- deps: install node_modules from the lockfile ----------
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- builder: compile the standalone server bundle ----------
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# Public (client-inlined) values are BAKED here, at build time — Next freezes
# every NEXT_PUBLIC_* into the JS bundle now. Changing these needs a rebuild.
# Everything sensitive stays out of the image and is supplied at runtime via
# the server's /opt/emoji/.env (see compose.yml env_file).
ENV NEXT_PUBLIC_SITE_URL=https://www.emojismeaning.com
ENV NEXT_PUBLIC_SITE_NAME="Emoji Meaning"
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- runner: minimal image that serves .next/standalone ----------
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Server-side runtime reads of these (robots.ts, sitemap route) — kept in sync
# with the build-time values baked above.
ENV NEXT_PUBLIC_SITE_URL=https://www.emojismeaning.com
ENV NEXT_PUBLIC_SITE_NAME="Emoji Meaning"

# Run as an unprivileged user.
RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# standalone/ ships server.js + traced node_modules; static/ and public/ are
# not traced into it and must be copied alongside.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
