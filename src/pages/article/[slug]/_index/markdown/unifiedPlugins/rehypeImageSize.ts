import type { Plugin } from "unified";
import type { Root as HastRoot } from "hast";
import { CONTINUE, visit } from "unist-util-visit";

const imageTitleRegExp = /^w=(large|medium|small|\d+)$/u;

const imageSizePreset: Readonly<Record<string, number>> = {
  large: 640,
  medium: 480,
  small: 320,
};

/**
 * `<img title="w=320">`を`<img width="320">`に置き換えるRehypeプラグイン
 */
export const rehypeImageSize: Plugin<[], HastRoot> = () => {
  return async (tree, file) => {
    visit(
      tree,
      { type: "element", tagName: "img" },
      (node, _index, _parent) => {
        if (typeof node.properties?.title !== "string") {
          return CONTINUE;
        }

        const match = node.properties.title.match(imageTitleRegExp);
        if (match === null) {
          file.fail(`Invalid title: ${node.properties.title}`, node);
          return CONTINUE;
        }

        const width =
          // biome-ignore lint/style/noNonNullAssertion: the length of match is checked
          imageSizePreset[match[1]!] ?? Number.parseInt(match[1]!, 10);
        if (Number.isNaN(width)) {
          file.fail(`Unexpected image size: ${match[1]}`, node);
          return CONTINUE;
        }

        // biome-ignore lint/performance/noDelete: this property needs to be deleted
        delete node.properties.title;
        node.properties.width = width;

        return CONTINUE;
      },
    );
  };
};
