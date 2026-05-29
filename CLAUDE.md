# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (http://localhost:4321)
npm run build        # astro check + build (required before Docker)
npm run preview      # preview production build locally
npm run lint         # auto-fix: prettier + eslint + cspell
npm run lint:ci      # check-only (what Jenkins runs)
```

There are no tests. The CI pipeline runs `lint:ci` then `build`.

## Architecture

Astro v4 SSR blog/portfolio site. `output: "server"` with the Node.js standalone adapter. Deployed as a Docker container via a self-hosted Jenkins → Gitea registry pipeline (only on `main`).

### Content Collections

Defined in `src/content/config.ts`. Two collections:

- **`blog`** — MDX posts in `src/content/blog/`. Posts can be either a single `.mdx` file or a folder with `index.mdx` + co-located images. Required frontmatter: `title`, `pubDate`, `description`, `authors[]`, `tags[]`, `draft`.
- **`project`** — MDX entries in `src/content/project/`. Required frontmatter: `title`, `description`, `authors[]`, `contributors[]`, `draft`.

Posts with `draft: true` are excluded from all listings and the search endpoint.

### Layout Chain

`BaseLayout.astro` is the root — it owns `<html>`, Header, Footer, global SCSS, OG/Twitter meta, and GTM (via Partytown). `MarkdownPostLayout.astro` extends it and adds JSON-LD (`BlogPosting` schema), published/updated dates, tags, and authors. `ProjectLayout.astro` similarly extends BaseLayout.

### Preact Components

Interactive UI uses Preact, not React. Any `.tsx` component file must start with:

```tsx
/** @jsxImportSource preact */
```

Current Preact components: `Search.tsx` (client-side DOM filter on the blog list), `Banner.tsx`, `Greeting.tsx`.

### Utility Files

`src/utilities/getPosts.astro` and `getProjects.astro` are `.astro` files that export typed collection arrays (`allPosts`, `publishedPosts`, `draftPosts`). Import them like any other module from pages that need the full post list.

### Search

`Search.tsx` filters the rendered `<li>` DOM elements directly by title/description/tag — it does not call the API. `src/pages/api/search.json.ts` is a separate SSR endpoint that returns all non-draft blog + project items as JSON (used for external consumers or future client-side index).

### Styling

SCSS with partials in `src/styles/`. All partials are imported through `global.scss`, which `BaseLayout.astro` imports. Color variables live in `_colors.scss`.

### Notable Integrations

- **`astro-expressive-code`** — code blocks with line numbers and collapsible sections.
- **`astro-icon`** with `@iconify-json/mdi` — Material Design Icons via `<Icon name="mdi:..." />`.
- **`remark-modified-time`** (`src/scripts/remark/remark-modified-time.mjs`) — sets `lastModified` frontmatter. The git-based implementation is currently commented out (timing issue in CI); it sets an empty string instead.
- **Switch/Case components** (`src/components/switch-case/`) — custom Astro component pattern for conditional slot rendering used in `MarkdownPostLayout`.

### Deployment

The Dockerfile builds the site and runs `node ./dist/server/entry.mjs` on port 4321. The Jenkins pipeline builds/pushes to `gitea.local.aflorzy.com/florzytech/aflorzy-astro` only when on `main`.
