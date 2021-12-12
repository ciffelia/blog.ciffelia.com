export interface Props {
  children: React.ReactNode;
}

const Tag: React.VFC<Props> = ({ children }) => (
  <li className="border border-gray-300 rounded-md px-1.5">{children}</li>
);

export default Tag;
