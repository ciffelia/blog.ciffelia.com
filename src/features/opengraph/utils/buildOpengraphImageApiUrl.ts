import { CURRENT_SITE_URL_BASE } from '@/config';

export const buildCommonOpengraphImageUrl = (): string => {
  const url = new URL('/api/opengraph/common', CURRENT_SITE_URL_BASE);
  return url.toString();
};

export const buildArticleOpengraphImageUrl = (title: string): string => {
  const url = new URL('/api/opengraph/article', CURRENT_SITE_URL_BASE);
  url.searchParams.set('title', title);
  return url.toString();
};
