import React from 'react';
import { EmbeddedTweet } from 'react-tweet';
import { type EmbedTweetData } from '../../types/EmbedData';
import { ExternalLink } from '@/components/ExternalLink';

export interface TweetProps {
  data: EmbedTweetData;
}

export const EmbedTweet: React.FC<TweetProps> = ({ data }) => (
  <div className="not-prose tracking-normal w-full min-h-[225px] overflow-x-auto grid place-items-center">
    {data.tweet !== undefined ? (
      <EmbeddedTweet tweet={data.tweet} />
    ) : (
      <ExternalLink to={`https://twitter.com/i/status/${data.id}`}>
        View post on X
      </ExternalLink>
    )}
  </div>
);
