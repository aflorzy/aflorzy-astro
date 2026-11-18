import type { APIRoute } from "astro";
import { GET as astroImageEndpoint } from "astro/assets/endpoint/node";
// `outDir` and `assetsDir` are real exports of the `astro:assets` virtual module
// (used by Astro's own endpoint), but they are not part of its public types.
import * as astroAssets from "astro:assets";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const { outDir, assetsDir } = astroAssets as unknown as {
  outDir: URL;
  assetsDir: URL;
};

const isRemote = (src: string) =>
  /^(?:[a-z]+:)?\/\//i.test(src) || src.startsWith("data:");

const notFound = () =>
  new Response("Not Found", {
    status: 404,
    headers: { "Cache-Control": "public, max-age=3600" },
  });

/**
 * Wraps Astro's Node image endpoint. Astro 4 answers a request whose source
 * image does not exist (e.g. a hashed `/_astro/*.png` from a previous deploy,
 * still requested by crawlers and cached pages) with an HTTP 500 and logs nothing.
 * Those requests get a 404 here instead; everything else is passed through.
 */
export const GET: APIRoute = async (context) => {
  const href = new URL(context.request.url).searchParams.get("href");

  if (!href) {
    return new Response("Bad Request: missing href", { status: 400 });
  }

  if (!import.meta.env.DEV && !isRemote(href)) {
    try {
      const file = new URL("." + href, outDir);
      // Throws on malformed paths (e.g. an encoded "/" from a double-encoded href)
      if (!fileURLToPath(file).startsWith(fileURLToPath(assetsDir))) {
        return notFound();
      }
      await access(file);
    } catch {
      return notFound();
    }
  }

  return astroImageEndpoint(context);
};
