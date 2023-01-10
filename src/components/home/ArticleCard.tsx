import Link from 'next/link';
import Image from 'next/image';
import { FaRegEdit } from 'react-icons/fa';
import { ArticleMetadata, ArticleThumbnail } from '@/types/ArticleMetadata';
import Timestamp from '@/components/common/Timestamp';
import { buildEmojiImageUrl } from '@/utils/buildApiUrl';

export interface Props {
  metadata: ArticleMetadata;
}

const ArticleCard: React.FC<Props> = ({
  metadata: { slug, title, publishedAt, thumbnail },
}) => (
  <li className="flex overflow-hidden rounded-2xl bg-gray-50 shadow-lg shadow-white/10 hover:shadow-white/25 transition-all duration-200">
    <Link href={`/article/${slug}`} className="grow flex flex-col">
      <div className="relative w-full aspect-ogp border-b border-slate-200">
        <Thumbnail thumbnail={thumbnail} />
      </div>
      <div className="grow p-4 flex flex-col gap-1">
        <div className="grow flex justify-center items-center">
          <span className="text-xl font-bold">{title}</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaRegEdit />
          <Timestamp value={publishedAt} dateOnly />
        </div>
      </div>
    </Link>
  </li>
);

interface ThumbnailProps {
  thumbnail: ArticleThumbnail;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ thumbnail }) => {
  if ('url' in thumbnail) {
    return (
      <Image
        src={thumbnail.url}
        alt=""
        className="object-cover"
        fill
        sizes="100%"
      />
    );
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={buildEmojiImageUrl(thumbnail.emoji)}
          alt=""
          className="w-32"
        />
      </div>
    );
  }
};

export default ArticleCard;
