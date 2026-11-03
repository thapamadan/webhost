# madanthapa.com.np

Personal site built with [TanStack Start](https://tanstack.com/start) (React 19,
Tailwind v4, shadcn/ui) and deployed to **Cloudflare Workers**.

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
npm i
npm run dev
```

| Command           | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Vite dev server                                    |
| `npm run build`   | Production build into `.output/`                   |
| `npm run preview` | Serve the production build locally                 |
| `npm test`        | Vitest run                                         |
| `npm run lint`    | ESLint                                             |
| `npm run deploy`  | Build, then deploy to Cloudflare from your machine |

## Deployment

This is a **server-rendered** app, not a static site. The build emits a
Cloudflare Worker (`.output/server/index.mjs`) plus static assets
(`.output/public`), so it cannot be hosted on GitHub Pages.

Every push to `main` runs `.github/workflows/deploy.yml`, which tests, builds and
deploys to Cloudflare Workers.

### How the Wrangler config is assembled

There are two pieces, and this trips people up:

1. `wrangler.jsonc` (repo root) — the part **you** edit: worker name,
   compatibility date, and the custom domains.
2. `npm run build` runs nitro, which **merges** that file into
   `.output/server/wrangler.json` and adds the build-specific bits (`main`,
   `assets`, `no_bundle`, module rules). Nitro always wins on those, so don't
   declare them in `wrangler.jsonc`.

Nitro also writes `.wrangler/deploy/config.json`, a pointer to the merged
config. That is why plain `wrangler deploy` works from the repo root with no
`--config` flag. Both generated paths are gitignored — **build before you
deploy**, or wrangler will not find a config.

### One-time setup

1. **Create a Cloudflare API token** — My Profile → API Tokens → Create Token →
   use the _Edit Cloudflare Workers_ template. It needs `Workers Scripts: Edit`,
   plus `Zone: DNS: Edit` and `Zone: Read` for the zone so the custom domains can
   be bound.
2. **Add two GitHub repository secrets** (Settings → Secrets and variables →
   Actions):
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID` (Cloudflare dashboard sidebar, or
     `npx wrangler whoami`)
3. **Clear the old GitHub Pages setup**, or the domain will keep serving this
   README instead of the app:
   - Repo Settings → Pages → set Source to **None**.
   - In Cloudflare DNS, delete the existing records for `madanthapa.com.np` and
     `www` that point at GitHub Pages. Wrangler cannot bind a custom domain over
     a conflicting record and will fail the deploy if one is still there.
4. **Push to `main`.** Watch the run in the Actions tab.

Deploying from your own machine instead: `npx wrangler login && npm run deploy`.

> [!NOTE]
> `wrangler.jsonc` sets `compatibility_date` explicitly. Left unset, nitro
> defaults it to the date of whichever machine ran the build, so the runtime
> semantics would quietly drift between deploys. Keep it at or below the newest
> date the pinned `wrangler` version's runtime supports — a date in the future
> makes `wrangler dev` refuse to start.
