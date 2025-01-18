import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { parseISO } from "date-fns";

const ISO8601 = z
  .string()
  .datetime({ offset: true })
  .transform((x) => parseISO(x));

const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });

const articleCollection = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/article" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.string().array(),
      isPublished: z.boolean(),
      publishedAt: ISO8601,
      modifiedAt: ISO8601,
      thumbnail: z.union([
        z.string().refine((x) => [...segmenter.segment(x)].length === 1, {
          message: "must be a single grapheme cluster",
        }),
        image(),
      ]),
    }),
});

export const collections = {
  article: articleCollection,
};
