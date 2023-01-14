import { Plugin } from 'unified';
import { Element, ElementContent, Root as HastRoot } from 'hast';
import { SKIP, visit } from 'unist-util-visit';
import { createEmbedDataFromUrl } from '../createEmbedData';

/**
 * 1つのURLのみからなる段落があるとき、そのURLを<custom-embed>要素に変換するrehypeプラグイン。
 */
export const rehypeEmbed: Plugin<[], HastRoot> = () => {
  return async (tree, file) => {
    const nodeListWithUrl: Array<{
      url: URL;
      node: Element;
      index: number | null;
      parent: HastRoot | Element | null;
    }> = [];

    visit(tree, { type: 'element', tagName: 'p' }, (node, index, parent) => {
      if (node.children.length !== 1 || node.children[0].type !== 'text') {
        return SKIP;
      }
      try {
        const url = new URL(node.children[0].value);
        nodeListWithUrl.push({ url, node, index, parent });
      } catch {
        return SKIP;
      }
    });

    const nodeListWithEmbedData = await Promise.all(
      nodeListWithUrl.map(async ({ url, ...rest }) => ({
        embedData: await createEmbedDataFromUrl(url),
        ...rest,
      })),
    );

    for (const { embedData, node, index, parent } of nodeListWithEmbedData) {
      if (index === null || parent === null) {
        continue;
      }
      parent.children.splice(index, 1, {
        type: 'element',
        tagName: 'custom-embed',
        properties: {
          data: JSON.stringify(embedData),
        },
        children: [],
        position: node.position,
      });
    }
  };
};

const createEmbedElementFromUrl = async (
  url: URL,
): Promise<ElementContent> => ({
  type: 'element',
  tagName: 'custom-embed',
  properties: {
    data: JSON.stringify(await createEmbedDataFromUrl(url)),
  },
  children: [],
});
