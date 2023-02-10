import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StaticImageData } from 'next/image';
import * as images from '@/articles/images';

export const markdownDirPath = path.join(
  fileURLToPath(import.meta.url),
  '../contents/markdown',
);

export const getImage = (id: string): StaticImageData | undefined => {
  if (!(id in images)) {
    return undefined;
  }
  return (images as Record<string, StaticImageData>)[id];
};
