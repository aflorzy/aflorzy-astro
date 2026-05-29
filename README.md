# AFlorzy Blog

Personal blog and portfolio for [Andrew Flores](https://blog.aflorzy.com) — a Software Engineer from Duluth, Minnesota who writes about homelabbing, Docker, Linux, and self-hosting.

## About

The goal of this site is to present hard-won knowledge in a concise, easy-to-follow format so others can learn more efficiently. Posts cover topics like game server hosting, containerization, hypervisors, and Linux.

## Contributing

Contributions to article corrections, clarifications, and updates are welcome. The content lives in [`src/content/blog/`](./src/content/blog/) as MDX files.

### Fixing a typo or updating an article

1. Fork the repo and create a branch.
2. Find the post under `src/content/blog/<post-slug>/index.mdx` (or `<post-slug>.mdx` for single-file posts).
3. Make your changes and open a pull request with a brief description of what changed and why.

### Adding images to a post

Images are co-located with their post in the same folder (e.g. `src/content/blog/my-post/screenshot.png`) and imported directly in the MDX file using Astro's `<Image>` component.

### Blog post frontmatter

Every post requires this frontmatter:

```yaml
---
title: "Your Post Title"
pubDate: YYYY-MM-DD
description: "One-sentence summary shown in listings and OG tags."
authors:
  - Your Name
tags:
  - tag-one
  - tag-two
draft: false   # set to true to hide from listings while writing
---
```

`lastModified` is optional and can be set manually when updating an existing post.

## Development

**Prerequisites:** Node.js LTS

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # type-check + production build
npm run lint       # auto-fix formatting, linting, and spelling
npm run lint:ci    # check-only (no auto-fix)
```

## Tech Stack

- [Astro](https://astro.build) v4 (SSR, Node.js standalone adapter)
- [Preact](https://preactjs.com) for interactive components
- [MDX](https://mdxjs.com) for blog content
- SCSS for styling
- [Expressive Code](https://expressive-code.com) for syntax-highlighted code blocks
- Docker for deployment
