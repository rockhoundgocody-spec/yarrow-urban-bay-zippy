import { defineConfig } from "vitest/config";

// Kept separate from vite.config.ts so tests don't load the TanStack Start / Nitro plugins.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "scripts/**/*.test.mjs"],
  },
});
