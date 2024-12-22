// import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    // const filepath = file.history[0];

    // TODO: Learn how this can execute during the compilation CI build stage
    // const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    const result = "";

    file.data.astro.frontmatter.lastModified = result.toString();
  };
}
