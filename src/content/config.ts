import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    lastModified: z.coerce.date().optional(),
    description: z.string(),
    authors: z.array(z.string()),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()),
    draft: z.boolean(),
  }),
});

const projectCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string(),
    authors: z.array(z.string()),
    contributors: z.array(z.string()),
    attributes: z.array(z.string()).optional(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    draft: z.boolean(),
  }),
});

export const collections = {
  blog: blogCollection,
  project: projectCollection,
};
