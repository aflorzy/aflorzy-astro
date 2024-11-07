import rss from "@astrojs/rss";
import { publishedPosts } from "../utilities/getPosts.astro";

export async function GET(context) {
  return rss({
    title: "AFlorzy | Blog",
    description: "Linux, Docker, Programming, and more!",
    site: context.site,
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: post.slug,
    })),
    customData: `<language>en-us</language>`,
  });
}
