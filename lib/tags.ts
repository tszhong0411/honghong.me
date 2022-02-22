import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getFiles } from "./mdx";
import kebabCase from "./utils/kebabCase";
import { PostFrontMatter } from "@/lib/types";

const root = process.cwd();

export async function getAllTags(type: "blog" | "authors", otherLocale: string) {
  const files = await getFiles(type, otherLocale);
  let tagCount = {};
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, "data", type, file), "utf8");
    const matterFile = matter(source);
    const data = matterFile.data as PostFrontMatter;
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  return tagCount;
}
