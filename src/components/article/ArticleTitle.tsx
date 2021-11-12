import { FaRegCalendarAlt } from 'react-icons/fa';
import { ArticleMetadata } from '@/types/ArticleMetadata';
import { Timestamp } from '@/components/common/Timestamp';

export interface Props {
  metadata: ArticleMetadata;
}

const ArticleTitle: React.FC<Props> = ({
  metadata: { title, modifiedAt, tags },
}) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="prose">
        <h1 className="text-center">{title}</h1>
      </div>
      <ul className="flex justify-center items-center gap-x-2">
        {tags.map((tag) => (
          <li key={tag} className="border border-gray-300 rounded-md px-1.5">
            {tag}
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-x-2">
        <FaRegCalendarAlt />
        <Timestamp value={modifiedAt} dateOnly />
      </div>
    </div>
  );
};

export default ArticleTitle;
