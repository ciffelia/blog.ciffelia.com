import type { CollectionEntry } from "astro:content";
import {
  backgroundPng,
  logoPng,
  render as renderElement,
} from "../../../../opengraph";

export async function render(
  article: CollectionEntry<"article">,
): Promise<Buffer> {
  return await renderElement(
    <div lang="ja-JP" tw="relative w-full h-full flex">
      <img tw="absolute" src={backgroundPng} alt="" />
      <div tw="absolute w-full h-full flex flex-col">
        <div tw="w-full h-[80%] flex items-center justify-center text-center">
          <span tw="text-gray-50 text-8xl leading-tight font-bold">
            {article.data.title}
          </span>
        </div>
        <div tw="w-full h-[20%] bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
          <Logo />
        </div>
      </div>
    </div>,
  );
}

const Logo: React.FC = () => (
  <div tw="flex items-center" style={{ gap: "16px" }}>
    <img tw="w-16 h-16 rounded-full" src={logoPng} alt="" />
    <span
      tw="font-semibold text-5xl text-gray-50"
      style={{ fontFamily: "Quicksand" }}
    >
      blog.ciffelia.com
    </span>
  </div>
);
