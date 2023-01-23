import React, { useEffect, useRef } from 'react';
import { EmbedTweetData } from '../../types/EmbedData';

export interface TweetProps {
  data: EmbedTweetData;
}

export const EmbedTweet: React.FC<TweetProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-expect-error we do not type window.twttr
    window.twttr?.widgets.load(ref.current);
  }, [data.id]);

  return (
    <div
      className="not-prose w-full min-h-[225px] overflow-x-auto grid place-items-center"
      dangerouslySetInnerHTML={{ __html: generateEmbedHtml(data.id) }}
      ref={ref}
    />
  );
};

const generateEmbedHtml = (id: string): string => {
  if (!/^\d+$/u.test(id)) {
    throw new Error(`Invalid tweet ID: ${id}`);
  }

  return `<blockquote class="twitter-tweet"><a href="https://twitter.com/i/status/${id}"></a></blockquote>`;
};

export const twitterWidgetScriptUrl = 'https://platform.twitter.com/widgets.js';
