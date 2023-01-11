import { Tag } from './Tag';

export interface TagListProps {
  tags: string[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => (
  <ul className="flex flex-wrap justify-center items-center gap-x-2">
    {tags.map((tag) => (
      <li key={tag}>
        <Tag>{tag}</Tag>
      </li>
    ))}
  </ul>
);
