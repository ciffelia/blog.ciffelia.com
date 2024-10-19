// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import {
  rehypeEmbed,
  rehypeImageSize,
  remarkRemoveTitle,
} from "./src/pages/article/_[...slug]/markdown/unifiedPlugins";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.ciffelia.com",
  integrations: [react(), tailwind(), mdx()],
  prefetch: {
    prefetchAll: true,
  },
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
