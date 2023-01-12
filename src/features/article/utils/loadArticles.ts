import { fileURLToPath } from 'url';
import path from 'path';
import { promises as fs } from 'fs';
import { strict as assert } from 'assert';
import type { Root as HastRoot } from 'hast';
import { ArticleMetadata } from '../types/ArticleMetadata';
import { transformMarkdown, extractMarkdownMetadata } from './parseMarkdown';

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
): Promise<{ tree: HastRoot; metadata: ArticleMetadata }> => {
  const articlePath = path.join(articlesDir, `${id}.md`);
  const markdownText = await fs.readFile(articlePath, 'utf-8');

  try {
    const { tree, metadata } = await transformMarkdown(markdownText);
    assert.equal(
      metadata.id,
      id,
      'id must match the filename of the markdown file.',
    );

    return { tree, metadata };
  } catch (e) {
    throw new Error(`Failed to parse ${articlePath}`, { cause: e });
  }
};

export const getArticleMetadata = async (
  id: string,
): Promise<ArticleMetadata> => {
  const articlePath = path.join(articlesDir, `${id}.md`);
  const markdownText = await fs.readFile(articlePath, 'utf-8');

  try {
    const metadata = await extractMarkdownMetadata(markdownText);
    assert.equal(
      metadata.id,
      id,
      'id must match the filename of the markdown file.',
    );

    return metadata;
  } catch (e) {
    throw new Error(`Failed to parse ${articlePath}`, { cause: e });
  }
};
