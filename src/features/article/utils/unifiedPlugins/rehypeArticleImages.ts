import { StaticImageData } from 'next/image';
import { Plugin } from 'unified';
import { Root as HastRoot } from 'hast';
import { CONTINUE, visit } from 'unist-util-visit';
import { images } from '@/articles';

/**
 * `<img src="images://<id>">`を`<custom-image>`に置き換えるRehypeプラグイン
 */
export const rehypeArticleImages: Plugin<[], HastRoot> = () => {
  return async (tree, file) => {
    visit(tree, { type: 'element', tagName: 'img' }, (node, index, parent) => {
      const { src, ...props } = node.properties ?? {};

      if (typeof src !== 'string' || !src.startsWith('image://')) {
        return CONTINUE;
      }
      const imageId = src.slice('image://'.length);

      if (!(imageId in images)) {
        file.fail(`Image ${imageId} not found.`, node);
      }
      const staticImageData = (images as Record<string, StaticImageData>)[
        imageId
      ];

      node.tagName = 'custom-image';
      node.properties = {
        staticImageData: JSON.stringify(staticImageData),
        ...props,
      };

      return CONTINUE;
    });
  };
};
