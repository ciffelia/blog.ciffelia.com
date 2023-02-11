import path from 'node:path';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import type { Root as HastRoot } from 'hast';
import { markdownDirPath } from '@/articles';
import { type ArticleMetadata } from '../types/ArticleMetadata';
import { transformMarkdown, extractMarkdownMetadata } from './parseMarkdown';

export const listArticleId = async (): Promise<string[]> => {
  const fileNames = await fs.readdir(markdownDirPath);
  return fileNames.map((f) => f.replace(/\.md$/, ''));
};

export const getArticle = async (
  id: string,
): Promise<{ tree: HastRoot; metadata: ArticleMetadata }> => {
  const articlePath = path.join(markdownDirPath, `${id}.md`);
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
  const articlePath = path.join(markdownDirPath, `${id}.md`);
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
