import { isSameDay, parseISO } from 'date-fns';
import { FaPencilRuler, FaRegEdit, FaSync } from 'react-icons/fa';
import { ArticleMetadata } from '@/features/article';
import { TagList } from '@/components/TagList';
import { Timestamp } from '@/components/Timestamp';

export interface ArticleHeaderProps {
  metadata: ArticleMetadata;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  metadata: { title, isPublished, publishedAt, modifiedAt, tags },
}) => {
  const publishedAtDate = parseISO(publishedAt);
  const modifiedAtDate = parseISO(modifiedAt);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="prose">
        <h1 className="text-center">{title}</h1>
      </div>
      <TagList tags={tags} />
      <div className="flex justify-center items-center gap-x-4">
        {!isPublished && (
          <div className="flex justify-center items-center gap-x-2 text-red-500">
            <FaPencilRuler />
            <span>下書き</span>
          </div>
        )}
        <div className="flex justify-center items-center gap-x-2">
          <FaRegEdit />
          <Timestamp value={publishedAtDate} dateOnly />
        </div>
        {!isSameDay(publishedAtDate, modifiedAtDate) && (
          <div className="flex justify-center items-center gap-x-2">
            <FaSync />
            <Timestamp value={modifiedAtDate} dateOnly />
          </div>
        )}
      </div>
    </div>
  );
};
