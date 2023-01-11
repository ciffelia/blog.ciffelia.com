import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export const handler = async (req: NextRequest): Promise<Response> => {
  const emoji = req.nextUrl.searchParams.get('emoji');
  if (emoji === null) {
    return new Response(null, { status: 400 });
  }

  const codepoints = [...emoji];
  const name = codepoints
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((cp) => cp.codePointAt(0)!.toString(16))
    .join('-');

  const url = `https://raw.githubusercontent.com/shuding/fluentui-emoji-unicode/d180c95fdfd7e1fc90addb48e215b9246d918b34/assets/${name}_color.svg`;
  const res = await fetch(url);

  if (res.status === 404) {
    return new Response(null, { status: 404 });
  }
  if (!res.ok) {
    return new Response(null, { status: 500 });
  }

  return new Response(res.body, {
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control': 'public, immutable, no-transform, max-age=31536000',
    },
  });
};
