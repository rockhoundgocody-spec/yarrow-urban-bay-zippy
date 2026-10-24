# Base44 development preview

Start the preview with:

```sh
docker compose -f docker-compose.base44.yml up -d --build --wait
```

The Compose service runs the cloned source with `npm run dev`. It maps the
project's existing Vite port 8080 to preview port 3000. Source is bind-mounted,
and dependencies live in a separate Docker volume. Startup always runs
`npm ci` from `package-lock.json` before starting Vite. The npm lockfile includes
the separate AJV versions required by the dependency tree; an inconsistent
lockfile prevents the app from starting at all.

## Sandbox configuration

- The Base44 preview uses Compose, not the legacy `startup.sh` for the original
  `/workspace` host environment. The original scripts and Vite ports are unchanged.
- `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is forwarded from the platform so Vite
  accepts the preview proxy's hostname without opening its allowlist to everyone.
- `CHOKIDAR_USEPOLLING=true` and `CHOKIDAR_INTERVAL=300` enable source watching
  across Docker bind mounts. These settings apply only to this Compose service.
- No shared application override depends on `BASE44_PREVIEW_MODE`; with that flag
  set or unset, the app retains its original configuration and authentication
  behavior. The existing `.grok/app-env.json` is still read by the npm wrapper.
- The healthcheck requests the real home page and checks that RockHound-GO HTML
  renders. It tolerates initial dependency installation and brief live reloads.
- `restart: on-failure` restarts an exited process; it does not restart the app
  merely because a healthcheck fails.

## Data and credentials

The current app stores its field data in the browser under `rhgo-field-v2`.
There are no active top-level database migrations, and no database service or
seed is needed for the home page. Do not clear browser data to repair startup.

The platform provides external credentials in `/run/base44/app.env`, outside
this repository. It is the final Compose `env_file` and no Compose environment
entry overrides `XAI_API_KEY`. The key is optional for loading the app, but Clover
and photo identification need a valid xAI key. Verification of startup should
not send paid AI requests.

## Verification

```sh
docker compose -f docker-compose.base44.yml ps
curl --fail http://localhost:3000/
docker compose -f docker-compose.base44.yml exec -T web npm run typecheck
docker compose -f docker-compose.base44.yml exec -T web npm run build
```

An HTTP success alone does not prove the screen is usable. Verify the home page
in the browser at desktop and mobile widths, dismissing the existing welcome
and field-intro screens when present. Open and close the navigation menu to
confirm that the page is interactive, and check for runtime errors and horizontal
overflow. Restore any browser settings changed during verification.
