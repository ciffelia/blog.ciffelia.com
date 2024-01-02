import { type EmbedLinkCardData } from '../../types/EmbedData';
import { fetchLinkCard } from './fetchLinkCard';
import { fetchAndConvertImage, type ImageSize } from './fetchAndConvertImage';

const faviconSize = {
  // 実際の表示サイズは16x16だが、HDPIを考慮して2倍にする
  width: 32,
  height: 32,
} as const satisfies ImageSize;

const ogImageSize = {
  // 1200x630を高さ256pxにリサイズする
  // 実際の表示サイズは高さ128pxだが、HDPIを考慮して2倍にする
  width: 488,
  height: 256,
} as const satisfies ImageSize;

export const createEmbedLinkCardData = async (
  url: URL,
): Promise<EmbedLinkCardData> => {
  const { faviconUrl, ogImageUrl, ...linkCard } = await fetchLinkCard(url);

  const faviconDataUrl =
    faviconUrl !== undefined
      ? await fetchAndConvertImage(new URL(faviconUrl), url, faviconSize)
      : undefined;

  const ogImageDataUrl =
    ogImageUrl !== undefined
      ? await fetchAndConvertImage(new URL(ogImageUrl), url, ogImageSize)
      : undefined;

  return {
    type: 'card',
    ...linkCard,
    faviconDataUrl,
    ogImageDataUrl,
  };
};
