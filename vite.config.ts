import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
// @ts-expect-error JS module alongside the TS vite config
import { securityHeaders, securityHeadersPlugin } from "./scripts/security-headers.mjs";

// `0.0.0.0:8080` is the live-preview contract — don't change host/port.
// The dev server starts once `src/router.tsx` and `src/routes/` exist — see
// AGENTS.md § "First scaffold".
export default defineConfig(({ command, isPreview }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    // CSP, clickjacking, nosniff, permissions — dev server half.
    securityHeadersPlugin(),
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" || isPreview
      ? [
          nitro({
            preset: "vercel",
            // Production security headers (static assets + SSR pages).
            routeRules: {
              "/**": { headers: securityHeaders({ dev: false }) },
              "/assets/**": {
                headers: { "cache-control": "public, max-age=31536000, immutable" },
              },
              "/sw.js": {
                headers: { "cache-control": "no-cache", "service-worker-allowed": "/" },
              },
            },
          }),
        ]
      : []),
    viteReact(),
  ],
}));
