/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

import type { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

const quicksand600Data = fetch(
  new URL(
    '../assets/fonts/Quicksand/static/Quicksand-SemiBold.ttf',
    import.meta.url,
  ),
).then(async (res) => await res.arrayBuffer());

export const handler = async (req: NextRequest): Promise<ImageResponse> => {
  return new ImageResponse(
    (
      <div lang="ja-JP" tw="relative w-full h-full flex">
        <img
          tw="absolute"
          src={new URL('../assets/background.png', import.meta.url).toString()}
        />
        <div tw="absolute w-full h-full flex items-center justify-center">
          <Logo />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Quicksand',
          weight: 600,
          data: await quicksand600Data,
        },
      ],
    },
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Logo: React.FC = () => (
  <div tw="flex items-center">
    <img
      // gapが使えないのでmargin-rightで代用
      tw="w-32 h-32 mr-8 rounded-full"
      src={new URL('@/assets/ciffelia.png', import.meta.url).toString()}
    />
    <span tw="font-['Quicksand'] font-semibold text-8xl text-gray-50">
      blog.ciffelia.com
    </span>
  </div>
);
