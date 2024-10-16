// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import {
  rehypeImageSize,
  remarkRemoveTitle,
} from "./src/pages/article/_[...slug]/markdown/unifiedPlugins";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  markdown: {
    remarkPlugins: [remarkRemoveTitle],
    rehypePlugins: [rehypeImageSize],
  },
});
