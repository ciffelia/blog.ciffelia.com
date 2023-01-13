import { Plugin } from 'unified';
import { ElementContent, Root as HastRoot } from 'hast';
import { selectAll } from 'hast-util-select';
import { createEmbedDataFromUrl } from '@/features/embed';

/**
 * 1つのURLのみからなる段落があるとき、そのURLを<custom-embed>要素に変換するrehypeプラグイン。
 */
export const rehypeEmbed: Plugin<[], HastRoot> = () => {
  return async (tree, file) => {
    const urlNodeList = selectAll('p', tree).flatMap((pNode) => {
      if (pNode.children.length !== 1 || pNode.children[0].type !== 'text') {
        return [];
      }
      try {
        const url = new URL(pNode.children[0].value);
        return [{ parent: pNode, url }];
      } catch {
        // not URL
        return [];
      }
    });

    await Promise.all(
      urlNodeList.map(async ({ parent, url }) => {
        parent.children = [await createEmbedElementFromUrl(url)];
      }),
    );
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
