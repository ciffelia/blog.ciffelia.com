import React from 'react';
import { Tweet } from 'react-tweet';
import { type EmbedTweetData } from '../../types/EmbedData';

export interface TweetProps {
  data: EmbedTweetData;
}

export const EmbedTweet: React.FC<TweetProps> = ({ data }) => (
  <div className="not-prose tracking-normal w-full min-h-[225px] overflow-x-auto grid place-items-center">
    <Tweet id={data.id} />
  </div>
);
