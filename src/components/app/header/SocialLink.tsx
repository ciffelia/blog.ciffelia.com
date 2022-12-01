import React from 'react';
import Image, { StaticImageData } from 'next/image';
import ExternalLink from '@/components/common/ExternalLink';

export interface Props {
  name: string;
  url: string;
  color: string;
  icon: StaticImageData;
}

const SocialLink: React.FC<Props> = ({ name, url, color, icon }) => (
  <ExternalLink to={url}>
    <div
      style={{ backgroundColor: color }}
      className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full"
    >
      <Image
        src={icon}
        alt={name}
        className="w-8 h-8 object-contain"
        priority
      />
    </div>
  </ExternalLink>
);

export default SocialLink;
