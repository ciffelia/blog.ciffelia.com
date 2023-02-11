import { type Plugin } from 'unified';
import { type Root as HastRoot } from 'hast';
import { CONTINUE, visit } from 'unist-util-visit';

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
    visit(tree, { type: 'element', tagName: 'img' }, (node, index, parent) => {
      if (typeof node.properties?.title !== 'string') {
        return CONTINUE;
      }

      const match = node.properties.title.match(imageTitleRegExp);
      if (match === null) {
        file.fail(`Invalid title: ${node.properties.title}`, node);
        return CONTINUE;
      }

      node.properties.width =
        imageSizePreset[match[1]] ?? parseInt(match[1], 10);
      if (isNaN(node.properties.width)) {
        throw new Error(`Unexpected image size: ${match[1]}`);
      }

      return CONTINUE;
    });
  };
};
