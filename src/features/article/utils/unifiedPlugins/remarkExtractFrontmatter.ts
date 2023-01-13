import { Plugin } from 'unified';
import { Root as MdastRoot } from 'mdast';
import yaml from 'yaml';

/**
 * A remark plugin to extract a frontmatter.
 * The frontmatter will be removed, and its content will be stored in `data.matter`.
 */
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
