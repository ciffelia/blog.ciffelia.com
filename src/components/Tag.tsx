export interface TagProps {
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children }) => (
  <div className="border border-gray-300 rounded-md px-1.5">{children}</div>
);
