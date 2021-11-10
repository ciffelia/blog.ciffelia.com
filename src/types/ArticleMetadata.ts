export default interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: Date;
  modifiedAt: Date;
  ogpImageUrl: string;
}
