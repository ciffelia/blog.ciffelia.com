import React, { useMemo } from 'react';
import Image from 'next/image';
import cat1 from '@/images/silhouette/cat1.svg';
import cat2 from '@/images/silhouette/cat2.svg';
import cat3 from '@/images/silhouette/cat3.svg';

const items = [
  <Image
    key="cat1"
    src={cat1}
    alt="lovely cat"
    width="100"
    height="100"
    objectFit="contain"
  />,
  <Image
    key="cat2"
    src={cat2}
    alt="lovely cat"
    width="100"
    height="100"
    objectFit="contain"
  />,
  <Image
    key="cat3"
    src={cat3}
    alt="lovely cat"
    width="100"
    height="100"
    objectFit="contain"
  />,
];

const randomlySelectItem = (): React.ReactNode => {
  const i = Math.floor(Math.random() * items.length);
  return items[i];
};

const SilhouetteCard: React.VFC = () => {
  const randomItem = useMemo(randomlySelectItem, []);

  return (
    <li className="flex justify-center items-center p-6 rounded-2xl bg-gray-50 drop-shadow-2xl">
      {randomItem}
    </li>
  );
};

export default SilhouetteCard;
