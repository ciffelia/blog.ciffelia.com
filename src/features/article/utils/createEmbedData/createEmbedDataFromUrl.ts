import { EmbedData } from '../../types/EmbedData';
import {
  createEmbedTweetDataFromUrl,
  tweetUrlRegex,
} from './createEmbedTweetDataFromUrl';
import { createEmbedCardDataFromUrl } from './createEmbedCardDataFromUrl';

export const createEmbedDataFromUrl = async (url: URL): Promise<EmbedData> => {
  if (tweetUrlRegex.test(url.toString())) {
    return createEmbedTweetDataFromUrl(url);
  } else {
    return await createEmbedCardDataFromUrl(url);
  }
};
