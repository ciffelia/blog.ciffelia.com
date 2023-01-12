import { strict as assert } from 'assert';
import { VFile } from 'vfile';
import { unified } from 'unified';
import type { Root as HastRoot } from 'hast';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypePresetMinify from 'rehype-preset-minify';
import { ArticleMetadata } from '../types/ArticleMetadata';
import {
  remarkExtractTitle,
  rehypeRemovePosition,
  remarkExtractFrontmatter,
} from './unifiedPlugins';

// Markdownドキュメントをパースし、hastノードとメタデータを返す。
export const transformMarkdown = async (
  markdown: string,
): Promise<{ tree: HastRoot; metadata: ArticleMetadata }> => {
  const file = new VFile(markdown);
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkExtractFrontmatter)
    .use(remarkExtractTitle)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypePresetMinify)
    .use(rehypeRemovePosition)
    .freeze();

  const mdastRoot = processor.parse(file);
  const hastRoot = await processor.run(mdastRoot, file);

  const metadata = ArticleMetadata.parse(file.data.matter);
  assert.equal(
    metadata.title,
    file.data.title,
    'title must match the first heading of the markdown.',
  );

  return { tree: hastRoot, metadata };
};

// Markdownドキュメントをパースし、メタデータを返す。
// `transformMarkdown`より速い。
export const extractMarkdownMetadata = async (
  markdown: string,
): Promise<ArticleMetadata> => {
  const file = new VFile(markdown);
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkExtractFrontmatter)
    .freeze();

  const root = processor.parse(file);
  await processor.run(root, file);

  return ArticleMetadata.parse(file.data.matter);
};