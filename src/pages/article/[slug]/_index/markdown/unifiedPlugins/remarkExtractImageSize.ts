import type { Plugin } from "unified";
import type { Root as MdastRoot } from "mdast";
import { CONTINUE, visit } from "unist-util-visit";

const imageTitleRegExp = /^w=(large|medium|small|\d+)$/u;

const imageSizePreset: Readonly<Record<string, number>> = {
  large: 640,
  medium: 480,
  small: 320,
};

declare module "mdast" {
  interface ImageData {
    /**
     * The width of the displayed image.
     */
    width?: number | undefined;
  }
}

/**
 * `<img title="w=320">`のように指定された画像の幅を抽出するremarkプラグイン
 */
export const remarkExtractImageSize: Plugin<[], MdastRoot> = () => {
  return async (tree, file) => {
    visit(tree, { type: "image" } as const, (node, _index, _parent) => {
      if (node.title == null) {
        return CONTINUE;
      }

      const match = node.title.match(imageTitleRegExp);
      if (match == null) {
        file.fail(`Invalid title: ${node.title}`, node);
        return CONTINUE;
      }

      const width =
        // biome-ignore lint/style/noNonNullAssertion: the regex guarantees that match[1] is not null
        imageSizePreset[match[1]!] ?? Number.parseInt(match[1]!, 10);
      if (Number.isNaN(width)) {
        file.fail(`Unexpected image size: ${match[1]}`, node);
        return CONTINUE;
      }

      node.title = undefined;
      node.data ??= {};
      node.data.width = width;

      return CONTINUE;
    });
  };
};
