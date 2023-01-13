import { EmbedData } from '../../types/EmbedData';
import { createEmbedCardDataFromUrl } from './createEmbedCardDataFromUrl';

export const createEmbedDataFromUrl = async (url: URL): Promise<EmbedData> => {
  return await createEmbedCardDataFromUrl(url);
};
