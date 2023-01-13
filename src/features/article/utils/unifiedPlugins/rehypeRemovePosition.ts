import { Plugin } from 'unified';
import { Root as HastRoot } from 'hast';
import { removePosition } from 'unist-util-remove-position';

/**
 * A rehype plugin to remove the position field from a tree.
 */
export const rehypeRemovePosition: Plugin<[], HastRoot> = () => {
  return (tree, file) => {
    removePosition(tree, true);
  };
};
