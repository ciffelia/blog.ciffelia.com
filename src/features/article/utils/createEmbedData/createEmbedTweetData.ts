import { type EmbedTweetData } from '../../types/EmbedData';

const tweetUrlRegExp =
  /^https:\/\/(?:mobile\.)?twitter\.com\/\w+\/status\/(\d+)/u;

export const isTweetUrl = (url: URL): boolean => {
  return tweetUrlRegExp.test(url.toString());
};

export const createEmbedTweetData = (url: URL): EmbedTweetData => {
  const match = url.toString().match(tweetUrlRegExp);
  if (match === null) {
    throw new Error(`Not tweet URL: ${url.toString()}`);
  }

  return { type: 'tweet', id: match[1] };
};
