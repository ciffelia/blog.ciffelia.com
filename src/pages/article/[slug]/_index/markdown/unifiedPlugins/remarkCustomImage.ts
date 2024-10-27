import type { Plugin } from "unified";
import type { Image, Root as MdastRoot } from "mdast";
import { SKIP, visit } from "unist-util-visit";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxjs } from "micromark-extension-mdxjs";
import { mdxFromMarkdown } from "mdast-util-mdx";

/**
 * A remark plugin to replace image nodes with custom Astro components.
 */
export const remarkCustomImage: Plugin<[], MdastRoot> = () => {
  return (tree, _file) => {
    visit(tree, { type: "image" } as const, (node, index, parent) => {
      const replacementTree = generateReplacementTree(node);
      console.dir(replacementTree, { depth: null });

      // biome-ignore lint/style/noNonNullAssertion: image nodes always have a parent
      parent!.children.splice(index!, 1, ...replacementTree.children);

      return SKIP;
    });
  };
};

const generateReplacementTree = (imageNode: Image): MdastRoot => {
  const imageIdentifier = `markdownImage_${crypto.randomUUID().replaceAll("-", "")}`;
  const width = imageNode.data?.width ?? 768;

  const tree = fromMarkdown(
    `import CustomImage from "../../pages/article/[slug]/_index/markdown/image/CustomImage.astro";
import ${imageIdentifier} from ${JSON.stringify(imageNode.url)};

<CustomImage src={${imageIdentifier}} alt={${JSON.stringify(imageNode.alt)}} width={${width}} />`,
    {
      extensions: [mdxjs({ acornOptions: { ranges: false } })],
      mdastExtensions: [mdxFromMarkdown()],
    },
  );

  visit(tree, (node) => {
    // Nodes that are generated (not in the original source document) must not have a position.
    node.position = undefined;

    // TODO: remove location information from estree
  });

  return tree;
};
