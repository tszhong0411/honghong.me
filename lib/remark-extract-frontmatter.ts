import { visit } from "unist-util-visit";
import { load } from "js-yaml";
import { VFile } from "vfile";
import { Parent } from "unist";

export default function extractFrontmatter() {
  return (tree: Parent, file: VFile) => {
    visit(tree, "yaml", (node: Parent) => {
      //@ts-ignore
      file.data.frontmatter = load(node.value);
    });
  };
}
