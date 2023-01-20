import { got } from '../../lib/got';

export interface LinkCard {
  url: string;
  title?: string;
  description?: string;
  faviconUrl?: string;
  ogImageUrl?: string;
}

export const fetchLinkCard = async (url: URL): Promise<LinkCard> => {
  const linkCardUrl = new URL('https://link-card.ciffelia.com/');
  linkCardUrl.searchParams.set('url', url.toString());

  return await got(linkCardUrl).json();
};
