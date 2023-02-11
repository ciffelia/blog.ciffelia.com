import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import { ExternalLink } from '@/components/ExternalLink';

export interface SocialLinkProps {
  name: string;
  url: string;
  color: string;
  icon: StaticImageData;
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  name,
  url,
  color,
  icon,
}) => (
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
