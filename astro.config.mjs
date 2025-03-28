// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import {
  rehypeEmbed,
  remarkExtractImageSize,
  remarkCustomImage,
  remarkForbidMdx,
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
    remarkPlugins: [
      remarkForbidMdx,
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
    },
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
});
