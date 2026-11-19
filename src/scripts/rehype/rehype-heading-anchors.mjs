import { visit } from "unist-util-visit";

const anchoredTags = new Set(["h2", "h3", "h4"]);

// mdi:link-variant
const linkIconPath =
  "M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.98 2.98 0 0 0 0-4.24a2.98 2.98 0 0 0-4.24 0l-3.53 3.53a2.98 2.98 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.98 2.98 0 0 0 0 4.24a2.98 2.98 0 0 0 4.24 0l3.53-3.53a2.98 2.98 0 0 0 0-4.24a.973.973 0 0 1 0-1.42";

// Appends a link to each heading pointing at its own id. Must run after
// rehypeHeadingIds so the ids exist. The link holds no text nodes, so Astro's
// own heading collection (which runs again later) still sees the plain text.
export function rehypeHeadingAnchors() {
  return function (tree) {
    visit(tree, "element", (node) => {
      if (!anchoredTags.has(node.tagName)) return;
      const id = node.properties?.id;
      if (typeof id !== "string" || id === "") return;

      node.children.push({
        type: "element",
        tagName: "a",
        properties: {
          className: ["heading-anchor"],
          href: `#${id}`,
          ariaLabel: "Copy link to this section",
          title: "Copy link to this section",
        },
        children: [
          {
            type: "element",
            tagName: "svg",
            properties: {
              viewBox: "0 0 24 24",
              width: "1em",
              height: "1em",
              ariaHidden: "true",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: { fill: "currentColor", d: linkIconPath },
                children: [],
              },
            ],
          },
        ],
      });
    });
  };
}
