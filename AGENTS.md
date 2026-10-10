# RockHound GO (rhgo.me) — agent guide

Field-companion web app for rockhounds: mineral ID (AI photo + offline field key),
Mineralpedia, field map, GeoDex collection, trips, quests and the Clover voice guide.

## Non-negotiable product rules

- Brand is exactly **"RockHound GO"**. Never "RockHound-GO", "Rock Hunt GO" or other variants.
- The gemstone is always **"Red beryl"** — no alternative names.
- **Never invent data, prices or content.** No price/value fields anywhere (tests enforce this),
  no seeded people, posts, reviews or listings. If real data is missing, ship an honest empty
  state and flag the gap to the owner.
- Locality legality text is unverified unless `legalityCheckedAt` **and** `legalitySource`
  (https URL) are both set; the UI shows an "Unverified" warning otherwise.
- Aesthetic: liquid-crystal, cinematic dark / frost / caustic amber. No purple.
- Mobile-first and field-usable: tap targets ≥ 44 px (48 px for primary controls),
  text ≥ 12 px (uppercase micro-labels) / 13 px (`text-xs`) elsewhere, reduced-motion respected.

## Stack

- React 19 + TanStack Start/Router (file routes in `src/routes`), Tailwind v4, zustand, zod.
- Built with Vite; production output is Nitro's `vercel` preset (`.vercel/output`).
- Dev in Base44: `docker compose -f docker-compose.base44.yml up -d` (container `app-web-1`,
  Vite on 8080 inside, 3000 on the host). Use **pnpm** (`pnpm-lock.yaml` is the only lockfile).
- No accounts and no database yet. All user data lives on the device:
  localStorage (`rhgo-field-v2`, versioned with `migrate`) and IndexedDB (`rhgo-photos`)
  for specimen photos. Accounts/sync are planned on Supabase.

## Where things live

| Concern | File |
| --- | --- |
| AI server functions (xAI) | `src/lib/identify.ts`, `src/lib/speak.ts` |
| AI abuse protection (origin check, per-IP limits) | `src/lib/ai-guard.ts` — every AI handler must call `guardAiCall()` first and validate input with a zod schema |
| Pure ID helpers (client-safe) | `src/lib/field-key.ts` |
| Persisted state + migrations | `src/lib/store.ts` — bump `version` and extend `migrate` for any shape change |
| Photos | `src/lib/photo-store.ts`, `src/lib/use-photo.ts` |
| Export / import / erase | `src/components/data-controls.tsx` |
| SEO head (title, canonical, OG/Twitter, JSON-LD, noindex) | `src/lib/seo.ts` — public routes use `pageHead()`, private ones `privateHead()`; add public routes to `src/routes/sitemap[.]xml.ts` |
| Security headers / CSP | `scripts/security-headers.mjs` (dev plugin + Nitro `routeRules`). Add any new external host here |
| PWA | `public/manifest.webmanifest`, `public/icons/*`, `public/sw.js` (bump `VERSION` when caching changes) |
| Data-handling page | `src/routes/data.tsx` — keep it true to what the code actually does |

Detail routes are un-nested (`pedia_.$id.tsx`) and `throw notFound()` in the loader for unknown
ids so the server returns a real 404.

## Definition of done

Run inside the container (`docker exec app-web-1 sh -c "cd /workspace && …"`):

1. `pnpm typecheck`, `pnpm lint` (zero problems) and `pnpm test` all pass.
2. `pnpm build`, then `pnpm preview` and:
   `node scripts/qa-routes.mjs http://127.0.0.1:8081` (statuses, h1, console errors, dead links)
   `node scripts/qa-offline.mjs …` (airplane-mode reloads), `node scripts/qa-data.mjs …`
   (photos, undo, export, erase, import) and `node scripts/qa-migrate.mjs …` (old saved data).
3. No secrets or personal emails in `.vercel/output/static`.

## Open decisions (owner)

- Canonical domain and where production is served (Base44 vs Vercel).
- Legal privacy policy and terms (operator name, contact, jurisdiction needed).
- Accounts, community, marketplace and subscriptions: not built; need decisions first.
