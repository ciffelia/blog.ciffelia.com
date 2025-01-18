import type { Plugin } from "unified";
import type { Root as MdastRoot } from "mdast";

/**
 * A remark plugin to check and remove the first <h1> heading.
 */
export const remarkRemoveTitle: Plugin<[], MdastRoot> = () => {
  return (tree, file) => {
    const firstNode = tree.children[0];
    if (firstNode === undefined) {
      file.fail("The Markdown document must not be empty.", tree);
      return;
    }

    if (firstNode.type !== "heading" || firstNode.depth !== 1) {
      file.fail(
        "The Markdown document must starts with an <h1> heading.",
        firstNode,
      );
      return;
    }

    if (
      firstNode.children.length !== 1 ||
      // biome-ignore lint/style/noNonNullAssertion: the length of children is checked
      firstNode.children[0]!.type !== "text"
    ) {
      file.fail(
        "The first <h1> heading must contain plain text only.",
        firstNode,
      );
      return;
    }

    if (typeof file.data.astro !== "object") {
      file.fail("astro object is missing in the file data.", firstNode);
      return;
    }
    if (
      // biome-ignore lint/suspicious/noExplicitAny: we don't want to write a type for the astro object
      (file.data.astro as any).frontmatter.title !== firstNode.children[0].value
    ) {
      file.fail(
        "The first <h1> heading must match the title in the frontmatter.",
        firstNode,
      );
      return;
    }

    // Delete the <h1> element
    tree.children.shift();
  };
};
