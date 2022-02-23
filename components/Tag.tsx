import Link from "next/link";
import kebabCase from "@/lib/utils/kebabCase";

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="solid mr-3 border-b-2 border-transparent text-sm font-semibold uppercase text-themeColor-500 duration-300 hover:border-themeColor-500 dark:text-themeColor-350 dark:hover:text-themeColor-350">
        {text.split(" ").join("-")}
      </a>
    </Link>
  );
};

export default Tag;
