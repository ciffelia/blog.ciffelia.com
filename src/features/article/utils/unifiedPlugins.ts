import type { Plugin } from 'unified';
import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot } from 'hast';
import { SKIP, visit } from 'unist-util-visit';

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

// A rehype plugin to wrap `<pre>` nodes with `<div class="not-prose">`.
export const rehypeNotProseForPre: Plugin<[], HastRoot> = () => {
  return (tree, file) => {
    visit(tree, { type: 'element', tagName: 'pre' }, (node, index, parent) => {
      if (index === null || parent === null) {
        return;
      }

      parent.children.splice(index, 1, {
        type: 'element',
        tagName: 'div',
        properties: { class: 'not-prose' },
        children: [node],
      });
      return SKIP;
    });
  };
};
