import fs from "node:fs/promises";
import type React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type {} from "./types.d.ts";

export const backgroundPng = (
  await fs.readFile("./src/opengraph/assets/background.png")
).buffer;

export const logoPng = (await fs.readFile("./src/assets/ciffelia.png")).buffer;

const bizUdpGothic400Data = await (
  await fetch(
    "https://github.com/googlefonts/morisawa-biz-ud-gothic/raw/18934af56b9c003ca58c54bffbf226848cb11032/fonts/ttf/BIZUDPGothic-Regular.ttf",
  )
).arrayBuffer();

const bizUdpGothic700Data = await (
  await fetch(
    "https://github.com/googlefonts/morisawa-biz-ud-gothic/raw/18934af56b9c003ca58c54bffbf226848cb11032/fonts/ttf/BIZUDPGothic-Bold.ttf",
  )
).arrayBuffer();

// static font files for Quicksand are not available on GitHub
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
