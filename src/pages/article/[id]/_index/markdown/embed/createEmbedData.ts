import { CachedFetcher } from "./cache";
import {
  createEmbedLinkCardData,
  type EmbedLinkCardData,
} from "./createEmbedLinkCardData";
import {
  createEmbedTweetData,
  type EmbedTweetData,
  isTweetUrl,
} from "./createEmbedTweetData";

export type EmbedData = EmbedLinkCardData | EmbedTweetData;

export const createEmbedData = async (url: URL): Promise<EmbedData> => {
  return await cache.fetch(url);
};

const cache = new CachedFetcher<EmbedData>({
  async fetcher(url) {
    if (isTweetUrl(url)) {
      const data = await createEmbedTweetData(url);
      if (data !== undefined) {
        return data;
      }
    }

    return await createEmbedLinkCardData(url);
  },
  cacheDir: "src/embed-cache",
});
