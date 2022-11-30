import React from 'react';
import Image from 'next/image';
import { useRandomChoice } from '@/utils/useRandomChoice';
import cat1 from '@/images/silhouette/cat1.svg';
import cat2 from '@/images/silhouette/cat2.svg';
import cat3 from '@/images/silhouette/cat3.svg';

const items = [cat1, cat2, cat3];

const SilhouetteCard: React.FC = () => {
  const randomItem = useRandomChoice(items);

  return (
    <li className="flex justify-center items-center p-6 rounded-2xl bg-gray-50 shadow-lg shadow-white/10 pointer-events-none select-none">
      {randomItem === undefined ? (
        <div className="w-24 h-24" />
      ) : (
        <Image
          src={randomItem}
          alt="lovely cat"
          className="w-24 h-24 object-contain"
          sizes="6rem"
        />
      )}
    </li>
  );
};

export default SilhouetteCard;
