// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import preact from "@astrojs/preact";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  site: "https://blog.aflorzy.com",
  integrations: [
    preact(),
    icon(),
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
