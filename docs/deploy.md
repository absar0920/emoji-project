# Deployment (VPS + GHCR + Caddy)

CI builds a Docker image, pushes it to GitHub Container Registry (GHCR), then
SSHes into the VPS and runs it behind Caddy (automatic HTTPS). Everything is in
`.github/workflows/deploy.yml`, `Dockerfile`, `compose.yml`, `Caddyfile`.

## How it flows

```
push to main ─▶ GitHub Actions
                 ├─ build image  ─▶ ghcr.io/absar0920/emoji-project:latest  (+ :sha-<short>)
                 └─ deploy
                     ├─ scp compose.yml + Caddyfile ─▶ /opt/emoji/
                     └─ ssh: docker login ghcr.io → compose pull → compose up -d
                                                       │
                              VPS: Caddy :80/:443 ─▶ emoji-app:3000 (internal)
```

- Trigger: push to `main`, or the **Run workflow** button (`workflow_dispatch`).
- Image tags: `:latest` (what compose runs) **and** `:sha-<short>` (immutable, for rollback).
- Deploy has a **few-seconds blip** while the container is recreated. Acceptable by design.

## One-time setup (before the first deploy)

### 1. GitHub repository secrets
Settings → Secrets and variables → Actions → **New repository secret**:

| Secret | Value |
|--------|-------|
| `SSH_HOST` | VPS public IP |
| `SSH_USER` | `root` |
| `SSH_PASSWORD` | root password |
| `GHCR_PAT` | GitHub **classic** PAT, scope `read:packages`, **no expiry** — used by the *server* to pull the private image |

> The image push (CI side) uses the built-in `GITHUB_TOKEN`; the PAT is only for the server's pull.

### 2. On the VPS
```bash
mkdir -p /opt/emoji
# One-time GHCR login so `docker compose pull` can fetch the private image.
echo "<GHCR_PAT>" | docker login ghcr.io -u absar0920 --password-stdin
```
Requirements already confirmed: amd64, ports 80/443 free, DNS for
`www.emojismeaning.com` + apex pointing at the VPS, Docker + Compose v2 installed.
Make sure the provider firewall allows inbound **80** and **443**.

### 3. Place the production `.env` at `/opt/emoji/.env`
Never committed, never touched by CI. `NEXT_PUBLIC_*` are **baked into the image**
at build time and are intentionally omitted here.

```dotenv
# --- Data stores ---
MONGODB_URI=mongodb+srv://...
MONGODB_DB=emoji-platform
UPSTASH_REDIS_REST_URL=https://<instance>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<token>

# --- AI providers ---
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...

# --- Admin / blog CMS ---
AUTH_SECRET=<32+ random bytes: openssl rand -base64 48>
SUPERADMIN_USERNAME=admin
SUPERADMIN_PASSWORD=<secret>
BLOG_AUTHOR_NAME=Emoji Meaning

# --- Cloudinary (blog image uploads) ---
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
CLOUDINARY_UPLOAD_FOLDER=blog

# --- Optional: rate-limit overrides (defaults in code) ---
# RL_ALLOWED_ORIGINS=https://www.emojismeaning.com
```

### 4. One-time Mongo indexes (not run by the pipeline)
From a machine with the repo + `.env.local`:
```bash
npm run create-indexes
npm run create-blog-indexes
```

## First deploy
Push to `main` (or run the workflow manually). Watch the Actions run; Caddy
issues certs on first boot, so give it a minute, then hit
`https://www.emojismeaning.com` and `https://www.emojismeaning.com/api/health`.

## Rollback
```bash
cd /opt/emoji
# find an older immutable tag in GHCR, then:
docker pull ghcr.io/absar0920/emoji-project:sha-<old>
docker tag  ghcr.io/absar0920/emoji-project:sha-<old> ghcr.io/absar0920/emoji-project:latest
docker compose up -d
```

## Notes / accepted tradeoffs
- **Password SSH** is the weakest link — a leaked password is a full root shell.
  Switching `SSH_PASSWORD` for an SSH key later is a drop-in change to the two
  deploy steps.
- Public site URL/name are compiled into the image; changing them needs a rebuild.
- `/trending` and `/tools/emoji-trends` render on demand (Redis-cached) rather
  than at build time, because the CI build has no database access.
