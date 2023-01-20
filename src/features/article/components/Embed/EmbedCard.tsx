import { EmbedLinkCardData } from '../../types/EmbedData';
import { useMemo } from 'react';

export interface EmbedCardProps {
  data: EmbedLinkCardData;
}

export const EmbedCard: React.FC<EmbedCardProps> = ({ data }) => {
  const { url, description, faviconDataUrl, ogImageDataUrl } = data;
  const title = data.title ?? data.url;

  const host = useMemo(() => {
    try {
      return new URL(url).host;
    } catch {
      return undefined;
    }
  }, [url]);

  return (
    <div className="not-prose tracking-normal text-start">
      <a
        className="my-5 w-full h-32 flex border rounded overflow-hidden hover:bg-slate-100 transition-colors"
        href={url}
        target="_blank"
      >
        <div className="grow px-5 py-3 flex flex-col gap-1.5 overflow-hidden">
          <span className="text-lg font-bold tracking-wide line-clamp-2">
            {title}
          </span>
          <span className="grow text-sm tracking-wide text-slate-500 truncate">
            {description}
          </span>
          <div className="flex items-center gap-1.5">
            {faviconDataUrl !== undefined && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="w-3.5 h-3.5" src={faviconDataUrl} alt="" />
            )}
            <span className="text-sm text-slate-600 truncate">{host}</span>
          </div>
        </div>
        {ogImageDataUrl !== undefined && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-full object-cover aspect-square sm:aspect-[1200/630]"
            src={ogImageDataUrl}
            alt=""
          />
        )}
      </a>
    </div>
  );
};
