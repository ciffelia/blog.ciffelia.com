import { fileURLToPath } from 'url';
import path from 'path';
import { promises as fs } from 'fs';
import assert from 'node:assert/strict';
import { ArticleMetadata } from '../types/ArticleMetadata';
import { parseMarkdown } from './parseMarkdown';

const articlesDir = path.join(
  fileURLToPath(import.meta.url),
  '../../../../articles',
);

export const listArticleId = async (): Promise<string[]> => {
  const fileNames = await fs.readdir(articlesDir);
  return fileNames.map((f) => f.replace(/\.md$/, ''));
};

export const getArticle = async (
  id: string,
): Promise<{ content: string; metadata: ArticleMetadata }> => {
  const articlePath = path.join(articlesDir, `${id}.md`);
  const rawContent = await fs.readFile(articlePath, 'utf-8');

  const { html, metadata } = await parseMarkdown(rawContent);
  assert.equal(
    metadata.id,
    id,
    'id must match the filename of the markdown file.',
  );

  return {
    content: html,
    metadata,
  };
};
