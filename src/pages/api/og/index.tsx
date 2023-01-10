import type { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(
  req: NextRequest,
): Promise<Response | ImageResponse> {
  const title = req.nextUrl.searchParams.get('title');
  if (title === null) {
    return new Response(null, { status: 400 });
  }

  return new ImageResponse(
    (
      <div lang="ja-JP" tw="relative w-full h-full flex">
        <img
          tw="absolute"
          src={new URL('./_assets/background.png', import.meta.url).toString()}
        />
        <div tw="absolute w-full h-full flex flex-col">
          <div tw="w-full h-[80%] flex items-center justify-center">
            <span tw="text-gray-50 text-8xl">{title}</span>
          </div>
          <div tw="w-full h-[20%] bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
            <img
              src={new URL('./_assets/logo.png', import.meta.url).toString()}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
