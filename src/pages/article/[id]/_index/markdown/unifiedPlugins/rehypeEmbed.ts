import type { Plugin } from "unified";
import type { Element, Root as HastRoot } from "hast";
import { isElement } from "hast-util-is-element";
import { is } from "unist-util-is";
import type {} from "mdast-util-mdxjs-esm";
import { createEmbedData } from "../embed/createEmbedData";

/**
 * 1つのURLのみからなる段落があるとき、そのURLを<custom-embed>要素に変換するrehypeプラグイン。
 */
export const rehypeEmbed: Plugin<[], HastRoot> = () => {
  return async (tree, _file) => {
    const nodeListWithUrl: Array<{
      url: URL;
      node: Element;
      index: number;
    }> = [];

    for (const [i, node] of tree.children.entries()) {
      /*
        Find the following pattern:
        {
          type: 'element',
          tagName: 'p',
          children: [
            {
              type: 'element',
              tagName: 'a',
              properties: { href: 'https://example.com/foo' },
              children: [
                {
                  type: 'text',
                  value: 'https://example.com/foo'
                }
              ]
            }
          ]
        }
      */
      if (
        isElement(node, "p") &&
        node.children.length === 1 &&
        isElement(node.children[0], "a") &&
        node.children[0].children.length === 1 &&
        is(node.children[0].children[0], "text") &&
        node.children[0].properties.href === node.children[0].children[0].value
      ) {
        let url: URL;
        try {
          url = new URL(node.children[0].properties.href);
        } catch {
          continue;
        }
        nodeListWithUrl.push({ url, node, index: i });
      }
    }

    const nodeListWithEmbedData = await Promise.all(
      nodeListWithUrl.map(async ({ url, ...rest }) => ({
        embedData: await createEmbedData(url),
        ...rest,
      })),
    );

    for (const { embedData, node, index } of nodeListWithEmbedData) {
      tree.children[index] = {
        type: "element",
        tagName: "custom-embed",
        properties: {
          data: JSON.stringify(embedData),
        },
        children: [],
        position: node.position,
      };
    }
  };
};
