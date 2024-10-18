// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import {
  rehypeEmbed,
  rehypeImageSize,
  remarkRemoveTitle,
} from "./src/pages/article/_[...slug]/markdown/unifiedPlugins";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), mdx()],
  markdown: {
    remarkPlugins: [remarkRemoveTitle],
    rehypePlugins: [rehypeImageSize, rehypeEmbed],
  },
  vite: {
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
});
