// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import preact from "@astrojs/preact";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import partytown from "@astrojs/partytown";

import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";

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
    expressiveCode({
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
    }),
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
