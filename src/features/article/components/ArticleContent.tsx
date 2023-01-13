import React, { useMemo } from 'react';
import type { Root as HastRoot } from 'hast';
import { unified } from 'unified';
import rehypeReact, { Options as RehypeReactOptions } from 'rehype-react';
import { Embed } from '@/features/embed';

export interface ArticleContentProps {
  tree: HastRoot;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ tree }) => {
  const processor = useMemo(() => {
    const options: RehypeReactOptions = {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        pre: CustomPre,
      },
    };
    // @ts-expect-error
    options.components['custom-embed'] = CustomEmbed;

    return unified().use(rehypeReact, options).freeze();
  }, []);

  return useMemo(() => processor.stringify(tree), [processor, tree]);
};

const CustomPre: React.FC<React.ComponentPropsWithoutRef<'pre'>> = (props) => {
  return (
    <div className="not-prose">
      <pre {...props} />
    </div>
  );
};

const CustomEmbed: React.FC<{ data: string }> = ({ data }) => {
  return <Embed data={JSON.parse(data)} />;
};
