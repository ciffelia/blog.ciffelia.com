export type EmbedData = EmbedCardData;

export interface EmbedCardData {
  type: 'card';
  url: string;
  title?: string;
  description?: string;
  favicon?: string;
  ogImage?: string;
}
