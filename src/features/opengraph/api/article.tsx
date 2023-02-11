/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

import type { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const notoSansLatin400Data = fetch(
  new URL(
    '../assets/fonts/noto-sans/noto-sans-latin-400-normal.woff',
    import.meta.url,
  ),
).then(async (res) => await res.arrayBuffer());

const quicksand600Data = fetch(
  new URL(
    '../assets/fonts/Quicksand/static/Quicksand-SemiBold.ttf',
    import.meta.url,
  ),
).then(async (res) => await res.arrayBuffer());

export const handler = async (
  req: NextRequest,
): Promise<Response | ImageResponse> => {
  const title = req.nextUrl.searchParams.get('title');
  if (title === null) {
    return new Response(null, { status: 400 });
  }

  return new ImageResponse(
    (
      <div lang="ja-JP" tw="relative w-full h-full flex">
        <img
          tw="absolute"
          src={new URL('../assets/background.png', import.meta.url).toString()}
        />
        <div tw="absolute w-full h-full flex flex-col">
          <div tw="w-full h-[80%] flex items-center justify-center">
            <span tw="text-gray-50 text-8xl">{title}</span>
          </div>
          <div tw="w-full h-[20%] bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
            <Logo />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans',
          weight: 400,
          data: await notoSansLatin400Data,
        },
        {
          name: 'Quicksand',
          weight: 600,
          data: await quicksand600Data,
        },
      ],
    },
  );
};

const Logo: React.FC = () => (
  <div tw="flex items-center">
    <img
      // gapが使えないのでmargin-rightで代用
      tw="w-16 h-16 mr-4 rounded-full"
      src={new URL('@/assets/ciffelia.png', import.meta.url).toString()}
    />
    <span
      tw="font-semibold text-5xl text-gray-50"
      style={{ fontFamily: '"Quicksand"' }}
    >
      blog.ciffelia.com
    </span>
  </div>
);
