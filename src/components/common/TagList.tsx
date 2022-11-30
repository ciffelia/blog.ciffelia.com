import Tag from '@/components/common/Tag';

export interface Props {
  tags: string[];
}

const TagList: React.FC<Props> = ({ tags }) => (
  <ul className="flex flex-wrap justify-center items-center gap-x-2">
    {tags.map((tag) => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </ul>
);

export default TagList;
