import fs from "node:fs/promises";
import type React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type {} from "./types.d.ts";

// NOTE: Productionビルド時にはこのソースファイルはdistディレクトリ内にバンドルされた状態で実行される。
// そのため、import.meta.urlを用いて相対パスでファイルを読み込むことはできない。
export const backgroundPng = (
  await fs.readFile("./src/opengraph/assets/background.png")
).buffer;

export const logoPng = (await fs.readFile("./src/assets/ciffelia.png")).buffer;

const bizUdpGothic400Data = await fetch(
  "https://github.com/google/fonts/raw/c8db839e73c32d7f18a01ab998e05650bd7567f9/ofl/bizudpgothic/BIZUDPGothic-Regular.ttf",
).then((res) => res.arrayBuffer());

const bizUdpGothic700Data = await fetch(
  "https://github.com/google/fonts/raw/c8db839e73c32d7f18a01ab998e05650bd7567f9/ofl/bizudpgothic/BIZUDPGothic-Bold.ttf",
).then((res) => res.arrayBuffer());

// GitHubに存在するQuicksandのフォントファイルは可変フォントのみ。
// Satoriは可変フォントをサポートしていないため、ローカルのフォントファイルを使用する。
const quicksand600Data = await fs.readFile(
  "./src/opengraph/assets/fonts/Quicksand/static/Quicksand-SemiBold.ttf",
);

export async function render(element: React.ReactNode): Promise<Buffer> {
  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "BIZ UDPGothic",
        weight: 400,
        data: bizUdpGothic400Data,
      },
      {
        name: "BIZ UDPGothic",
        weight: 700,
        data: bizUdpGothic700Data,
      },
      {
        name: "Quicksand",
        weight: 600,
        data: quicksand600Data,
      },
    ],
  });

  return new Resvg(svg).render().asPng();
}
