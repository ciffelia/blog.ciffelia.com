import {
  createEmbedTweetData,
  isTweetUrl,
  type EmbedTweetData,
} from "./createEmbedTweetData";
import {
  createEmbedLinkCardData,
  type EmbedLinkCardData,
} from "./createEmbedLinkCardData";

export type EmbedData = EmbedLinkCardData | EmbedTweetData;

const cache = new Map<string, Promise<EmbedData>>();

export const createEmbedData = async (url: URL): Promise<EmbedData> => {
  const cacheKey = url.toString();
  const cached = cache.get(cacheKey);
  if (cached !== undefined) {
    return await cached;
  }

  const promise = createEmbedDataWithoutCache(url);
  cache.set(cacheKey, promise);
  return await promise;
};

export const createEmbedDataWithoutCache = async (
  url: URL,
): Promise<EmbedData> => {
  if (isTweetUrl(url)) {
    const data = await createEmbedTweetData(url);
    if (data !== undefined) {
      return data;
    }
  }

  return await createEmbedLinkCardData(url);
};
