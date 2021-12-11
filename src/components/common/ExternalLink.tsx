export interface Props {
  to: string;
  children: React.ReactNode;
}

const ExternalLink: React.VFC<Props> = (props) => {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a href={props.to} target="_blank" rel="noopener">
      {props.children}
    </a>
  );
};

export default ExternalLink;
