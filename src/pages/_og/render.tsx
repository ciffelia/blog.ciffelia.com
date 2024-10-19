import {
  backgroundPng,
  logoPng,
  render as renderElement,
} from "../../opengraph";

export async function render(): Promise<Buffer> {
  return await renderElement(
    <div lang="ja-JP" tw="relative w-full h-full flex">
      <img
        tw="absolute"
        // @ts-expect-error
        src={backgroundPng}
        alt=""
      />
      <div tw="absolute w-full h-full flex items-center justify-center">
        <Logo />
      </div>
    </div>,
  );
}

const Logo: React.FC = () => (
  <div tw="flex items-center" style={{ gap: "32px" }}>
    <img
      tw="w-32 h-32 rounded-full"
      // @ts-expect-error
      src={logoPng}
      alt=""
    />
    <span
      tw="font-semibold text-8xl text-gray-50"
      style={{ fontFamily: "Quicksand" }}
    >
      blog.ciffelia.com
    </span>
  </div>
);
