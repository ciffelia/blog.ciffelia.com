import { strict as assert } from 'assert';
import matter from 'gray-matter';
import { VFile } from 'vfile';
import { unified } from 'unified';
import type { Root as HastRoot } from 'hast';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypePresetMinify from 'rehype-preset-minify';
import { ArticleMetadata } from '../types/ArticleMetadata';
import { remarkExtractTitle, rehypeRemovePosition } from './unifiedPlugins';

export const parseMarkdown = async (
  markdown: string,
): Promise<{ tree: HastRoot; metadata: ArticleMetadata }> => {
  const { content, data } = matter(markdown);
  const metadata = ArticleMetadata.parse(data);

  const file = new VFile(content);
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkExtractTitle)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypePresetMinify)
    .use(rehypeRemovePosition);

  const mdastRoot = processor.parse(file);
  const hastRoot = await processor.run(mdastRoot, file);

  assert.equal(
    metadata.title,
    file.data.title,
    'title must match the first heading of the markdown.',
  );

  return { tree: hastRoot, metadata };
};
