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
    const componentIdentifier = `CustomImage_${crypto.randomUUID().replaceAll("-", "")}`;
    const importTree = generateImportTree(componentIdentifier);
    tree.children.unshift(...importTree.children);

    visit(tree, { type: "image" } as const, (node, index, parent) => {
      const replacementTree = generateReplacementTree(
        node,
        componentIdentifier,
      );

      // biome-ignore lint/style/noNonNullAssertion: image nodes always have a parent
      parent!.children.splice(index!, 1, ...replacementTree.children);

      return SKIP;
    });
  };
};

const generateImportTree = (componentIdentifier: string): MdastRoot => {
  const tree = fromMarkdown(
    `import ${componentIdentifier} from "../../pages/article/[slug]/_index/markdown/image/CustomImage.astro";`,
    {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    },
  );

  // Nodes that are generated (not in the original source document) must not have a position.
  visit(tree, (node) => {
    node.position = undefined;
  });

  return tree;
};

const generateReplacementTree = (
  imageNode: Image,
  componentIdentifier: string,
): MdastRoot => {
  const imageIdentifier = `markdownImage_${crypto.randomUUID().replaceAll("-", "")}`;
  const width = imageNode.data?.width ?? 768;

  const tree = fromMarkdown(
    `import ${imageIdentifier} from ${JSON.stringify(imageNode.url)};

<${componentIdentifier} src={${imageIdentifier}} alt={${JSON.stringify(imageNode.alt)}} width={${width}} />`,
    {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    },
  );

  // Nodes that are generated (not in the original source document) must not have a position.
  visit(tree, (node) => {
    node.position = undefined;
  });

  return tree;
};
