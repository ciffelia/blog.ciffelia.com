import { FaRegEdit } from 'react-icons/fa';
import { ArticleMetadata } from '@/types/ArticleMetadata';
import TagList from '@/components/common/TagList';
import Timestamp from '@/components/common/Timestamp';

export interface Props {
  metadata: ArticleMetadata;
}

const ArticleHeader: React.FC<Props> = ({
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

export default ArticleHeader;
