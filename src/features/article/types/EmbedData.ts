import type { Tweet } from 'react-tweet/api';

export type EmbedData = EmbedLinkCardData | EmbedTweetData;

export interface EmbedLinkCardData {
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
  tweet?: Tweet;
}
