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

const timeout = 10_000;
const downloadLimit = 10 * 1024 * 1024;

export const createEmbedLinkCardData = async (
  url: URL,
): Promise<EmbedLinkCardData> => {
  const linkCardUrl = new URL("https://link-card.ciffelia.com/");
  linkCardUrl.searchParams.set("url", url.toString());

  const linkCard = (await fetchJson(linkCardUrl)) as LinkCard;

  return {
    type: "card",
    ...linkCard,
  };
};

const fetchJson = async (url: URL): Promise<unknown> => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeout),
  });

  if (!response.ok) {
    await response.body?.cancel();
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  if (response.body === null) {
    throw new Error(`Received an empty response body from ${url}`);
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array<ArrayBuffer>[] = [];
  let transferred = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    transferred += value.byteLength;
    if (transferred > downloadLimit) {
      await reader.cancel();
      throw new Error(`Exceeded the download limit of ${downloadLimit} bytes`);
    }

    chunks.push(value);
  }

  const body = new Uint8Array(transferred);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(body));
};
