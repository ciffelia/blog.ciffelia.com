import { unreachable } from '@/utils/unreachable';
import { EmbedData } from '../../types/EmbedData';
import { EmbedCard } from './EmbedCard';
import { EmbedTweet } from './EmbedTweet';

export interface EmbedProps {
  data: EmbedData;
}

export const Embed: React.FC<EmbedProps> = ({ data }) => {
  const { type } = data;
  if (type === 'card') {
    return <EmbedCard data={data} />;
  } else if (type === 'tweet') {
    return <EmbedTweet data={data} />;
  } else {
    return unreachable(type);
  }
};
