import { type EmbedData } from '../../types/EmbedData';
import { createEmbedTweetData, isTweetUrl } from './createEmbedTweetData';
import { createEmbedLinkCardData } from './createEmbedLinkCardData';

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
    return await createEmbedTweetData(url);
  } else {
    return await createEmbedLinkCardData(url);
  }
};
