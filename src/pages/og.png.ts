import type { APIRoute } from "astro";
import { render } from "./_og/render";

export const GET: APIRoute = async () => {
  return new Response(await render());
};
