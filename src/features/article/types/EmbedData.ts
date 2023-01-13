export type EmbedData = EmbedCardData;

export interface EmbedCardData {
  type: 'card';
  url: string;
  title?: string;
  description?: string;
  faviconDataUrl?: string;
  ogImageDataUrl?: string;
}
