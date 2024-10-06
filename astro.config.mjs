// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { rehypeImageSize } from "./src/markdown/unifiedPlugins";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [rehypeImageSize],
  },
});
