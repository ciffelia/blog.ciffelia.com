import type { Plugin } from 'unified';
import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot } from 'hast';
import { removePosition } from 'unist-util-remove-position';
import yaml from 'yaml';

// A remark plugin to extract a frontmatter.
// The frontmatter will be removed. Its content will be stored in `data.matter`.
export const remarkExtractFrontmatter: Plugin<[], MdastRoot> = () => {
  return (tree, file) => {
    if (tree.children.length === 0) {
      file.fail('A Markdown document must not be empty.', tree);
      return;
    }

    const firstNode = tree.children[0];
    if (firstNode.type !== 'yaml') {
      file.fail(
        'A Markdown document must starts with a frontmatter.',
        firstNode,
      );
      return;
    }

    file.data.matter = yaml.parse(firstNode.value);
    tree.children.shift();
  };
};

// A remark plugin to extract the content of the first heading.
// The heading will be removed. Its content will be stored in `data.title`.
export const remarkExtractTitle: Plugin<[], MdastRoot> = () => {
  return (tree, file) => {
    if (tree.children.length === 0) {
      file.fail('A Markdown document must not be empty.', tree);
      return;
    }

    const firstNode = tree.children[0];
    if (firstNode.type !== 'heading' || firstNode.depth !== 1) {
      file.fail(
        'A Markdown document must starts with an <h1> heading.',
        firstNode,
      );
      return;
    }

    if (
      firstNode.children.length !== 1 ||
      firstNode.children[0].type !== 'text'
    ) {
      file.fail(
        'The first <h1> heading must contain plain text only.',
        firstNode,
      );
      return;
    }

    file.data.title = firstNode.children[0].value;
    tree.children.shift();
  };
};

// A rehype plugin to remove the position field from a tree.
export const rehypeRemovePosition: Plugin<[], HastRoot> = () => {
  return (tree, file) => {
    removePosition(tree, true);
  };
};
