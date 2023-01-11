import { CURRENT_SITE_URL_BASE } from '@/config';

export const buildEmojiApiUrl = (emoji: string): string => {
  const url = new URL('/api/emoji', CURRENT_SITE_URL_BASE);
  url.searchParams.set('emoji', emoji);
  return url.toString();
};
