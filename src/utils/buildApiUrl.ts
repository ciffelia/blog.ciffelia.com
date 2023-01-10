import { CURRENT_SITE_URL_BASE } from '@/constants';

export const buildOgImageUrl = (title: string): string => {
  const url = new URL('/api/og', CURRENT_SITE_URL_BASE);
  url.searchParams.set('title', title);
  return url.toString();
};

export const buildEmojiImageUrl = (emoji: string): string => {
  const url = new URL('/api/emoji', CURRENT_SITE_URL_BASE);
  url.searchParams.set('emoji', emoji);
  return url.toString();
};
