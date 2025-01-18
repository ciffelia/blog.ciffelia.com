import { got } from "./got";

export type EmbedLinkCardData = {
  type: "card";
} & LinkCard;

interface LinkCard {
  url: string;
  title?: string;
  description?: string;
  faviconUrl?: string;
  ogImageUrl?: string;
}

export const createEmbedLinkCardData = async (
  url: URL,
): Promise<EmbedLinkCardData> => {
  const linkCardUrl = new URL("https://link-card.ciffelia.com/");
  linkCardUrl.searchParams.set("url", url.toString());

  const linkCard = (await got(linkCardUrl).json()) as LinkCard;

  return {
    type: "card",
    ...linkCard,
  };
};
