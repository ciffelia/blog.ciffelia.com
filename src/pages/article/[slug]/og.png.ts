import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { render } from "./_og/render";

export async function getStaticPaths() {
  const articles = await getCollection("article");
  return articles.map((article) => ({
    params: { slug: article.slug },
    props: { article },
  }));
}

export const GET: APIRoute<
  Awaited<ReturnType<typeof getStaticPaths>>[number]["props"],
  Awaited<ReturnType<typeof getStaticPaths>>[number]["params"]
> = async ({ props: { article } }) => {
  return new Response(await render(article));
};
