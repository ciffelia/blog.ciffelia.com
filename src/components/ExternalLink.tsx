export interface ExternalLinksProps {
  to: string;
  children: React.ReactNode;
}

export const ExternalLink: React.FC<ExternalLinksProps> = (props) => (
  // eslint-disable-next-line react/jsx-no-target-blank
  <a href={props.to} target="_blank" rel="noopener">
    {props.children}
  </a>
);
