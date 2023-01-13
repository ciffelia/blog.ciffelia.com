import { EmbedData } from '../types/EmbedData';

export const createEmbedDataFromUrl = async (url: URL): Promise<EmbedData> => {
  return { type: 'card', url: url.toString() };
};
