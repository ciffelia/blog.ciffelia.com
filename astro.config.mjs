// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import {
  rehypeEmbed,
  rehypeImageSize,
  remarkRemoveTitle,
} from "./src/pages/article/[slug]/_index/markdown/unifiedPlugins";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.ciffelia.com",
  integrations: [react(), tailwind(), mdx(), sitemap()],
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    remarkPlugins: [remarkRemoveTitle],
    rehypePlugins: [rehypeImageSize, rehypeEmbed],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
});
