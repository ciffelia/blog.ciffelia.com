import { buildEmojiApiUrl } from '../utils/buildEmojiApiUrl';

export interface EmojiImageProps {
  emoji: string;
  className?: string;
}

export const EmojiImage: React.FC<EmojiImageProps> = ({ emoji, className }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={buildEmojiApiUrl(emoji)} alt={emoji} className={className} />
  );
};
