import type { Plugin, Processor } from 'unified';
import { gfmFootnote } from 'micromark-extension-gfm-footnote';
import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough';
import { gfmTable } from 'micromark-extension-gfm-table';
import { gfmFootnoteFromMarkdown } from 'mdast-util-gfm-footnote';
import { gfmStrikethroughFromMarkdown } from 'mdast-util-gfm-strikethrough';
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table';

/**
 * A remark plugin to handle a subset of GFM.
 * This plugin supports footnotes, strikethrough, and tables. Autolink literals and task lists are not supported.
 * Note that the plugin only extends the parser. If you want to compile GFM, please use remark-gfm.
 */
export const remarkGfmSubset: Plugin<[]> = function () {
  const micromarkExtensions = [
    gfmFootnote(),
    gfmStrikethrough({ singleTilde: false }),
    gfmTable,
  ];
  const fromMarkdownExtensions = [
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown,
    gfmTableFromMarkdown,
  ];

  const data = (this as unknown as Processor).data();
  if (Array.isArray(data.micromarkExtensions)) {
    data.micromarkExtensions.push(...micromarkExtensions);
  } else {
    data.micromarkExtensions = micromarkExtensions;
  }
  if (Array.isArray(data.fromMarkdownExtensions)) {
    data.fromMarkdownExtensions.push(...fromMarkdownExtensions);
  } else {
    data.fromMarkdownExtensions = fromMarkdownExtensions;
  }
};
