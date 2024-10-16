import { type Tweet, getTweet } from "react-tweet/api";

export interface EmbedTweetData {
  type: "tweet";
  tweet: Tweet;
}

const tweetUrlRegExp =
  /^https:\/\/(?:mobile\.)?(?:twitter|x)\.com\/\w+\/status\/(\d+)/u;

export const isTweetUrl = (url: URL): boolean => {
  return tweetUrlRegExp.test(url.toString());
};

export const createEmbedTweetData = async (
  url: URL,
): Promise<EmbedTweetData | undefined> => {
  const match = url.toString().match(tweetUrlRegExp);
  if (match === null) {
    throw new Error(`Not tweet URL: ${url.toString()}`);
  }

  // biome-ignore lint/style/noNonNullAssertion: the RegExp guarantees that match[1] is not null
  const id = match[1]!;
  const tweet = await getTweet(id);
  if (tweet === undefined) {
    return undefined;
  }

  return { type: "tweet", tweet };
};
