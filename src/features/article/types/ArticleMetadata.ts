export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: Date;
  modifiedAt: Date;
  thumbnail: ArticleThumbnail;
}

export type ArticleThumbnail =
  | {
      url: string;
    }
  | {
      emoji: string;
    };
