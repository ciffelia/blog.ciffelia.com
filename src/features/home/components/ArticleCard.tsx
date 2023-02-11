import Link from 'next/link';
import Image from 'next/image';
import { parseISO } from 'date-fns';
import { FaRegEdit } from 'react-icons/fa';
import {
  type ArticleMetadata,
  type ArticleThumbnail,
} from '@/features/article';
import { Timestamp } from '@/components/Timestamp';
import { FluentEmojiImage } from '@/components/FluentEmojiImage';
import { unreachable } from '@/utils/unreachable';

export interface ArticleCardProps {
  metadata: ArticleMetadata;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  metadata: { id, title, publishedAt, thumbnail },
}) => (
  <li className="flex overflow-hidden rounded-2xl bg-gray-50 shadow-lg shadow-white/10 hover:shadow-white/25 transition-all duration-200">
    <Link href={`/article/${id}`} className="grow flex flex-col">
      <div className="relative w-full aspect-ogp border-b border-slate-200">
        <Thumbnail thumbnail={thumbnail} />
      </div>
      <div className="grow p-4 flex flex-col gap-1">
        <div className="grow flex justify-center items-center">
          <span className="text-xl font-bold">{title}</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaRegEdit />
          <Timestamp value={parseISO(publishedAt)} dateOnly />
        </div>
      </div>
    </Link>
  </li>
);

interface ThumbnailProps {
  thumbnail: ArticleThumbnail;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ thumbnail }) => {
  if ('staticImageData' in thumbnail) {
    return (
      <Image
        src={thumbnail.staticImageData}
        alt=""
        className="object-cover"
        fill
        sizes="100%"
      />
    );
  } else if ('emoji' in thumbnail) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <FluentEmojiImage emoji={thumbnail.emoji} className="w-32" />
      </div>
    );
  } else {
    return unreachable(thumbnail);
  }
};
