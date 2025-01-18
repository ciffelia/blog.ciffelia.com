import {
  createEmbedTweetData,
  isTweetUrl,
  type EmbedTweetData,
} from "./createEmbedTweetData";
import {
  createEmbedLinkCardData,
  type EmbedLinkCardData,
} from "./createEmbedLinkCardData";
import { CachedFetcher } from "./cache";

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
