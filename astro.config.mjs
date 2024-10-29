// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import {
  rehypeEmbed,
  remarkExtractImageSize,
  remarkCustomImage,
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
