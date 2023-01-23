import React, { useMemo } from 'react';
import Image, { StaticImageData } from 'next/image';
import type { Root as HastRoot } from 'hast';
import { unified } from 'unified';
import rehypeReact, { Options as RehypeReactOptions } from 'rehype-react';
import { Embed } from './Embed';

export interface ArticleContentProps {
  tree: HastRoot;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ tree }) => {
  const processor = useMemo(() => {
    const options: RehypeReactOptions = {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        pre: PreOverride,
      },
    };
    // @ts-expect-error
    options.components['custom-image'] = CustomImage;
    // @ts-expect-error
    options.components['custom-embed'] = CustomEmbed;

    return unified().use(rehypeReact, options).freeze();
  }, []);

  return useMemo(() => processor.stringify(tree), [processor, tree]);
};

const PreOverride: React.FC<React.ComponentPropsWithoutRef<'pre'>> = (
  props,
) => {
  return (
    <div className="not-prose text-start">
      <pre {...props} />
    </div>
  );
};

const CustomImage: React.FC<{
  staticImageData: string;
  alt: string;
  width?: number;
}> = ({ staticImageData: staticImageDataJson, alt, width }) => {
  const staticImageData = JSON.parse(staticImageDataJson) as StaticImageData;
  return (
    <span className="flex justify-center">
      <a href={staticImageData.src} target="_blank">
        <Image src={staticImageData} alt={alt} width={width} />
      </a>
    </span>
  );
};

const CustomEmbed: React.FC<{ data: string }> = ({ data }) => {
  return <Embed data={JSON.parse(data)} />;
};
