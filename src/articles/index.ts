import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const markdownDirPath = path.join(
  fileURLToPath(import.meta.url),
  '../contents/markdown',
);

export * as images from './images';
