import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
  return rss({
    title: "AFlorzy | Blog",
    description: "Linux, Docker, Programming, and more!",
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob("./posts/published/*.{md,mdx}")
    ),
    customData: `<language>en-us</language>`,
  });
}
