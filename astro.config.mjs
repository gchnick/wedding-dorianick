// @ts-check
import path from "node:path";

import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.dorianick.com",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  integrations: [react(), sitemap(), db()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },

    imageService: "compile",
  }),
  output: "server",
});
