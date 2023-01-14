export type EmbedData = EmbedCardData | EmbedTweetData;

export interface EmbedCardData {
  type: 'card';
  url: string;
  title?: string;
  description?: string;
  faviconDataUrl?: string;
  ogImageDataUrl?: string;
}

export interface EmbedTweetData {
  type: 'tweet';
  id: string;
}
