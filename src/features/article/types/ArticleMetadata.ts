/* eslint-disable @typescript-eslint/no-redeclare */

import { z } from 'zod';
import { getImage } from '@/articles';

const ISO8601 = z.string().datetime({ offset: true });

export const ArticleThumbnailStaticImage = z
  .object({
    imageId: z.string(),
  })
  .transform(({ imageId }, ctx) => {
    const staticImageData = getImage(imageId);
    if (staticImageData === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Image ${imageId} not found.`,
      });
      return z.NEVER;
    }
    return { staticImageData };
  });

export type ArticleThumbnailStaticImage = z.infer<
  typeof ArticleThumbnailStaticImage
>;

export const ArticleThumbnailEmoji = z.object({
  emoji: z.string(),
});

export type ArticleThumbnailEmoji = z.infer<typeof ArticleThumbnailEmoji>;

export const ArticleThumbnail = z.union([
  ArticleThumbnailStaticImage,
  ArticleThumbnailEmoji,
]);

export type ArticleThumbnail = z.infer<typeof ArticleThumbnail>;

export const ArticleMetadata = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.string().array(),
  isPublished: z.boolean(),
  publishedAt: ISO8601,
  modifiedAt: ISO8601,
  thumbnail: ArticleThumbnail,
});

export type ArticleMetadata = z.infer<typeof ArticleMetadata>;
