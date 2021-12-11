import { FaEdit } from 'react-icons/fa';
import { ArticleMetadata } from '@/types/ArticleMetadata';
import { Timestamp } from '@/components/common/Timestamp';
import TagList from '@/components/common/TagList';

export interface Props {
  metadata: ArticleMetadata;
}

const ArticleTitle: React.VFC<Props> = ({
  metadata: { title, publishedAt, tags },
}) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="prose">
        <h1 className="text-center">{title}</h1>
      </div>
      <TagList tags={tags} />
      <div className="flex justify-center items-center gap-x-2">
        <FaEdit />
        <Timestamp value={publishedAt} dateOnly />
      </div>
      <hr className="border-t-4" />
    </div>
  );
};

export default ArticleTitle;
