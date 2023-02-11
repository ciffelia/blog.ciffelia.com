import { isSameDay, parseISO } from 'date-fns';
import { FaPencilRuler, FaRegEdit, FaSync } from 'react-icons/fa';
import { type ArticleMetadata } from '@/features/article';
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
      <h1 className="text-center text-4xl font-extrabold tracking-wide">
        {title}
      </h1>
      <TagList tags={tags} />
      <div className="flex justify-center items-center gap-x-4">
        {!isPublished && (
          <div className="flex justify-center items-center gap-x-2 text-red-500">
            <FaPencilRuler role="presentation" />
            <span>下書き</span>
          </div>
        )}
        <div className="flex justify-center items-center gap-x-2">
          <FaRegEdit role="img" aria-label="公開日" />
          <Timestamp value={publishedAtDate} dateOnly />
        </div>
        {!isSameDay(publishedAtDate, modifiedAtDate) && (
          <div className="flex justify-center items-center gap-x-2">
            <FaSync role="img" aria-label="最終更新日" />
            <Timestamp value={modifiedAtDate} dateOnly />
          </div>
        )}
      </div>
    </div>
  );
};
