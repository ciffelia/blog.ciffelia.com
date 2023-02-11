import { type EmbedData } from '../../types/EmbedData';
import { createEmbedTweetData, isTweetUrl } from './createEmbedTweetData';
import { createEmbedLinkCardData } from './createEmbedLinkCardData';

export const createEmbedData = async (url: URL): Promise<EmbedData> => {
  if (isTweetUrl(url)) {
    return createEmbedTweetData(url);
  } else {
    return await createEmbedLinkCardData(url);
  }
};
