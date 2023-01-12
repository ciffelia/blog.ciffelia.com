import React, { useMemo } from 'react';
import type { Root as HastRoot } from 'hast';
import { unified } from 'unified';
import rehypeReact from 'rehype-react';

export interface ArticleContentProps {
  tree: HastRoot;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ tree }) => {
  const processor = useMemo(
    () =>
      unified()
        .use(rehypeReact, {
          createElement: React.createElement,
          Fragment: React.Fragment,
        })
        .freeze(),
    [],
  );

  return useMemo(() => processor.stringify(tree), [processor, tree]);
};
