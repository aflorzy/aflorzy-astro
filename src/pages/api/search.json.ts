import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const [blogEntries, projectEntries] = await Promise.all([
    getCollection("blog"),
    getCollection("project"),
  ]);

  const posts = blogEntries
    .filter((e) => !e.data.draft)
    .map((e) => ({
      type: "post" as const,
      title: e.data.title,
      description: e.data.description,
      slug: `/posts/${e.slug}`,
      tags: e.data.tags ?? [],
      pubDate: e.data.pubDate?.toISOString?.() ?? null,
      image: e.data.image?.url ?? null,
    }));

  const projects = projectEntries
    .filter((e) => !e.data.draft)
    .map((e) => ({
      type: "project" as const,
      title: e.data.title,
      description: e.data.description,
      slug: `/projects/${e.slug}`,
      tags: e.data.attributes ?? [],
      pubDate: null as null,
      image: e.data.image?.url ?? null,
    }));

  const items = [...posts, ...projects];

  return new Response(JSON.stringify({ items }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=600", // 10 minutes
    },
  });
};
