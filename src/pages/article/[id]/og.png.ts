import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { render } from "./_og/render";

export async function getStaticPaths() {
  const articles = await getCollection("article", ({ data }) => {
    return import.meta.env.DEV || data.isPublished;
  });
  return articles.map((article) => ({
    params: { id: article.id },
    props: { article },
  }));
}

export const GET: APIRoute<
  Awaited<ReturnType<typeof getStaticPaths>>[number]["props"],
  Awaited<ReturnType<typeof getStaticPaths>>[number]["params"]
> = async ({ props: { article } }) => {
  return new Response(new Uint8Array(await render(article)));
};
