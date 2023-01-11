export const SITE_NAME = 'blog.ciffelia.com';

export const SITE_DESCRIPTION =
  'Ciffeliaが何でも書くブログ。ソフトウェア開発、電子工作、近況、今年の振り返りなど。';

export const CURRENT_SITE_URL_BASE =
  process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export const PRODUCTION_SITE_URL_BASE = `https://blog.ciffelia.com`;
