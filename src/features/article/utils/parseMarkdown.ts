import assert from 'node:assert/strict';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypeStringify from 'rehype-stringify';
import { ArticleMetadata } from '../types/ArticleMetadata';
import { rehypeNotProseForPre, remarkExtractTitle } from './unifiedPlugins';

export const parseMarkdown = async (
  markdown: string,
): Promise<{ html: string; metadata: ArticleMetadata }> => {
  const { content, data } = matter(markdown);
  const metadata = ArticleMetadata.parse(data);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkExtractTitle)
    .use(remarkRehype)
    .use(rehypeNotProseForPre)
    .use(rehypeHighlight)
    .use(rehypePresetMinify)
    .use(rehypeStringify)
    .process(content);

  assert.equal(
    metadata.title,
    file.data.title,
    'title must match the first heading of the markdown.',
  );

  return { html: file.toString(), metadata };
};
