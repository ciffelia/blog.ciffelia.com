export const SITE_NAME = 'blog.ciffelia.com';

export const CURRENT_SITE_URL_BASE =
  process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export const PRODUCTION_SITE_URL_BASE = `https://blog.ciffelia.com`;
