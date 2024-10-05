import { z, defineCollection } from "astro:content";

const ISO8601 = z.string().datetime({ offset: true });

const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });

const articleCollection = defineCollection({
  type: "content",
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
