import type { Plugin } from "unified";
import type { Root as MdastRoot } from "mdast";
import { visit } from "unist-util-visit";

/**
 * A remark plugin to forbid usage of MDX syntax.
 */
export const remarkForbidMdx: Plugin<[], MdastRoot> = () => {
  return (tree, file) => {
    visit(
      tree,
      [
        "mdxjsEsm",
        "mdxFlowExpression",
        "mdxTextExpression",
        "mdxJsxFlowElement",
        "mdxJsxTextElement",
      ] as const,
      (node, _index, _parent) => {
        file.fail("MDX syntax is not supported in this project.", node);
      },
    );
  };
};
