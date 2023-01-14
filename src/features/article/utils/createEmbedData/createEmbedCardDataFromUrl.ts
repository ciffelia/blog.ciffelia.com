import * as cheerio from 'cheerio';
import { EmbedData } from '../../types/EmbedData';
import { got } from '../../lib/got';
import { warn } from './warn';
import { fetchAndConvertImage, ImageSize } from './fetchAndConvertImage';

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

export const createEmbedCardDataFromUrl = async (
  url: URL,
): Promise<EmbedData> => {
  let html: string;
  try {
    html = await got(url).text();
  } catch (err) {
    warn(`Failed to fetch embed data from URL: ${url.toString()}`, err);
    return { type: 'card', url: url.toString() };
  }

  return await createEmbedCardDataFromHtml(html, url);
};

const createEmbedCardDataFromHtml = async (
  html: string,
  url: URL,
): Promise<EmbedData> => {
  const $ = cheerio.load(html);

  const title = extractTitle($)?.slice(0, 256);
  const description = extractDescription($)?.slice(0, 256);

  const faviconUrl = extractFaviconUrl($, url);
  const faviconDataUrl =
    faviconUrl !== undefined
      ? await fetchAndConvertImage(faviconUrl, url, faviconSize)
      : undefined;

  const ogImageUrl = extractOpenGraphImageUrl($);
  const ogImageDataUrl =
    ogImageUrl !== undefined
      ? await fetchAndConvertImage(ogImageUrl, url, ogImageSize)
      : undefined;

  return {
    type: 'card',
    url: url.toString(),
    title,
    description,
    faviconDataUrl,
    ogImageDataUrl,
  };
};

const extractTitle = ($: cheerio.CheerioAPI): string | undefined =>
  fallback(extractOpenGraphProperty($, 'title'), $('title').text());

const extractDescription = ($: cheerio.CheerioAPI): string | undefined =>
  fallback(
    extractOpenGraphProperty($, 'description'),
    $('meta[name="description"]').attr('content'),
  );

const extractOpenGraphImageUrl = ($: cheerio.CheerioAPI): URL | undefined => {
  const urlText = extractOpenGraphProperty($, 'image');
  if (urlText === undefined) {
    return undefined;
  }

  try {
    return new URL(urlText);
  } catch (err) {
    warn(`Failed to parse OpenGraph image URL: ${urlText}`, err);
    return undefined;
  }
};

const extractOpenGraphProperty = (
  $: cheerio.CheerioAPI,
  property: string,
): string | undefined =>
  fallback(
    $(`meta[property="og:${property}"]`).attr('content'),
    $(`meta[property="twitter:${property}"]`).attr('content'),
  );

const extractFaviconUrl = (
  $: cheerio.CheerioAPI,
  pageUrl: URL,
): URL | undefined => {
  const faviconHref = $('link[rel~="icon"]').attr('href') ?? '/favicon.ico';

  const baseUrl = extractBaseUrl($, pageUrl);
  try {
    return new URL(faviconHref, baseUrl);
  } catch (err) {
    warn(`Failed to parse favicon URL: ${faviconHref}`, err);
    return pageUrl;
  }
};

const extractBaseUrl = ($: cheerio.CheerioAPI, pageUrl: URL): URL => {
  const baseHref = $('base').attr('href');
  if (baseHref === undefined) {
    return pageUrl;
  }

  try {
    return new URL(baseHref, pageUrl);
  } catch (err) {
    warn(`Failed to parse base URL: ${baseHref}`, err);
    return pageUrl;
  }
};

/**
 * 文字列の配列の中で、空でない最初の要素を返す。
 */
const fallback = (...args: Array<string | undefined>): string | undefined => {
  for (const x of args) {
    if (x !== undefined && x !== '') {
      return x;
    }
  }
};
