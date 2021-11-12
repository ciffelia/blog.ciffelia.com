import React from 'react';
import ExternalLink from '@/components/common/ExternalLink';

export interface Props {
  url: string;
  color: string;
  children: React.ReactNode;
}

const SocialLink: React.FC<Props> = ({ url, color, children }) => {
  return (
    <ExternalLink to={url}>
      <div
        style={{ backgroundColor: color }}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full"
      >
        <div className="relative w-8 h-8">{children}</div>
      </div>
    </ExternalLink>
  );
};

export default SocialLink;
