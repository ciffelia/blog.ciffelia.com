import { EmbedTweetData } from '../../types/EmbedData';

export const createEmbedTweetDataFromUrl = (url: URL): EmbedTweetData => {
  const match = url.toString().match(tweetUrlRegex);
  if (match === null) {
    throw new Error(`Not tweet URL: ${url.toString()}`);
  }

  return { type: 'tweet', id: match[1] };
};

export const tweetUrlRegex =
  /^https:\/\/(?:mobile\.)?twitter\.com\/\w+\/status\/(\d+)/u;
