import { type EmbedTweetData } from '../../types/EmbedData';
import { getTweet } from 'react-tweet/api';

const tweetUrlRegExp =
  /^https:\/\/(?:mobile\.)?twitter\.com\/\w+\/status\/(\d+)/u;

export const isTweetUrl = (url: URL): boolean => {
  return tweetUrlRegExp.test(url.toString());
};

export const createEmbedTweetData = async (
  url: URL,
): Promise<EmbedTweetData> => {
  const match = url.toString().match(tweetUrlRegExp);
  if (match === null) {
    throw new Error(`Not tweet URL: ${url.toString()}`);
  }

  return {
    type: 'tweet',
    id: match[1],
    tweet: await getTweet(match[1]),
  };
};
