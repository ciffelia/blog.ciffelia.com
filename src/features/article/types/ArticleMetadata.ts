/* eslint-disable @typescript-eslint/no-redeclare */

import { z } from 'zod';

const ISO8601 = z.string().datetime({ offset: true });

export const ArticleThumbnail = z.union([
  z.object({
    url: z.string().url(),
  }),
  z.object({
    emoji: z.string(),
  }),
]);

export type ArticleThumbnail = z.infer<typeof ArticleThumbnail>;

export const ArticleMetadata = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.string().array(),
  publishedAt: ISO8601,
  modifiedAt: ISO8601,
  thumbnail: ArticleThumbnail,
});

export type ArticleMetadata = z.infer<typeof ArticleMetadata>;
