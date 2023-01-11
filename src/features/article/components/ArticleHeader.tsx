import { FaRegEdit } from 'react-icons/fa';
import { ArticleMetadata } from '@/features/article';
import { TagList } from '@/components/TagList';
import { Timestamp } from '@/components/Timestamp';

export interface ArticleHeaderProps {
  metadata: ArticleMetadata;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  metadata: { title, publishedAt, tags },
}) => (
  <div className="flex flex-col gap-y-5">
    <div className="prose">
      <h1 className="text-center">{title}</h1>
    </div>
    <TagList tags={tags} />
    <div className="flex justify-center items-center gap-x-2">
      <FaRegEdit />
      <Timestamp value={publishedAt} dateOnly />
    </div>
  </div>
);
