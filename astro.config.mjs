// @ts-check

import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import {
  rehypeEmbed,
  remarkCustomImage,
  remarkExtractImageSize,
  remarkRemoveTitle,
} from "./src/pages/article/[id]/_index/markdown/unifiedPlugins";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.ciffelia.com",
  trailingSlash: "never",
  integrations: [react(), mdx(), sitemap()],
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkRemoveTitle,
        remarkExtractImageSize,
        remarkCustomImage,
      ],
      rehypePlugins: [
        rehypeHeadingIds,
        [
          rehypeAutoLinkHeadings,
          {
            content: { type: "text", value: "#" },
          },
        ],
        rehypeEmbed,
      ],
    }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
      include: ["react-tweet > swr > use-sync-external-store/shim"],
    },
    resolve: {
      noExternal: ["react-tweet"],
    },
  },
});
