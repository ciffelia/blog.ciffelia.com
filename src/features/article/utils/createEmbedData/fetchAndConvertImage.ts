import sharp from 'sharp';
import { got } from '../../lib/got';
import { warn } from './warn';

export interface ImageSize {
  width: number;
  height: number;
}

export const fetchAndConvertImage = async (
  imageUrl: URL,
  pageUrl: URL,
  size: ImageSize,
): Promise<string | undefined> => {
  const ctx: Context = { imageUrl, pageUrl };

  const originalData = await fetchImageData(imageUrl, ctx);
  if (originalData === undefined) {
    return undefined;
  }

  const convertedData = await convertImage(originalData, size, ctx);
  if (convertedData === undefined) {
    return undefined;
  }

  return createWebpDataUrl(convertedData);
};

const fetchImageData = async (
  url: URL,
  ctx: Context,
): Promise<Buffer | undefined> => {
  try {
    return await got(url).buffer();
  } catch (err) {
    warnWithCtx(`Failed to fetch an image.`, err, ctx);
    return undefined;
  }
};

const convertImage = async (
  favicon: Buffer,
  size: ImageSize,
  ctx: Context,
): Promise<Buffer | undefined> => {
  try {
    return await sharp(favicon)
      .resize(size.width, size.height)
      .webp()
      .toBuffer();
  } catch (err) {
    warnWithCtx(`Failed to convert an image.`, err, ctx);
    return undefined;
  }
};

const createWebpDataUrl = (webp: Buffer): string => {
  return `data:image/webp;base64,${webp.toString('base64')}`;
};

interface Context {
  imageUrl: URL;
  pageUrl: URL;
}

const warnWithCtx = (
  message: string,
  cause: unknown,
  context: Context,
): void => {
  warn(
    `${message}\nImage URL: ${context.imageUrl.toString()}\nPage URL: ${context.pageUrl.toString()}`,
    cause,
  );
};
