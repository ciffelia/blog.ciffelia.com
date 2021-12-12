export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: Date;
  modifiedAt: Date;
  thumbnailUrl: string;
}
