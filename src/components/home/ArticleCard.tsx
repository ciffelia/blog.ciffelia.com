import Link from 'next/link';
import Image from 'next/legacy/image';
import { FaRegEdit } from 'react-icons/fa';
import { ArticleMetadata } from '@/types/ArticleMetadata';
import Timestamp from '@/components/common/Timestamp';

export interface Props {
  metadata: ArticleMetadata;
}

const ArticleCard: React.VFC<Props> = ({
  metadata: { slug, title, publishedAt, thumbnailUrl },
}) => (
  <li className="flex overflow-hidden rounded-2xl bg-gray-50 shadow-lg shadow-white/10 hover:shadow-white/25 transition-all duration-200">
    <Link href={`/article/${slug}`} className="grow flex flex-col">
      <div className="relative w-full aspect-ogp border-b border-slate-200">
        <Image src={thumbnailUrl} alt="" layout="fill" objectFit="cover" />
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

export default ArticleCard;
