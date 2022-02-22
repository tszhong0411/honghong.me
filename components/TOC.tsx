import { useEffect, useRef, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Toc } from "@/lib/types";

interface TOCInlineProps {
  toc: Toc;
  indentDepth?: number;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {TOCInlineProps} {
 *   toc,
 *   indentDepth = 3,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 * }
 *
 */

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({});

  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) => headingElements.findIndex((heading) => heading.id === id);
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        // const sortedVisibleHeadings = visibleHeadings.sort(
        //   (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id),
        // );
        // setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-65px 0px -60% 0px",
    });

    const headingElements = Array.from(document.querySelectorAll("h2, h3"));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

const TocList = ({ filteredToc, activeId }) => {
  return (
    <div className="mt-1 transform space-y-1 transition duration-500 ease-in-out">
      {filteredToc.map((heading) => {
        return (
          <div
            key={heading.value}
            className={`flex items-center transition-all duration-500 ease-in-out`}
            style={{ marginLeft: (heading.depth - 2) * 16 }}
          >
            <div
              className={`m-[8px] h-[8px] w-[8px] min-w-[8px] rounded-[50%] border-2 border-solid ${
                heading.url.replace("#", "") === activeId ? "border-red-600 bg-red-600" : ""
              }`}
            ></div>
            <a
              href={heading.url}
              className={`block py-1 font-medium ${
                heading.url.replace("#", "") === activeId
                  ? "text-[#cb3728] dark:text-[#ff4532]"
                  : "hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
            >
              {heading.value}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default function TOC({ toc, fromHeading = 1, toHeading = 6, exclude = "" }: TOCInlineProps) {
  const { t } = useTranslation();

  const [activeId, setActiveId] = useState();
  useIntersectionObserver(setActiveId);
  const re = Array.isArray(exclude)
    ? new RegExp("^(" + exclude.join("|") + ")$", "i")
    : new RegExp("^(" + exclude + ")$", "i");
  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value),
  );

  return (
    <>
      <div
        className="fixed left-8 top-1/3 mt-10 hidden xl:block"
        id="toc"
        // initial={{ opacity: 0, x: "-100vw" }}
        // animate={{ opacity: 1, x: 0 }}
      >
        <div className="mb-4 text-sm tracking-tight text-gray-500 dark:text-gray-500">
          <span className="mb-2 text-lg font-bold text-black dark:text-gray-100">
            {t("common:toc")}
          </span>
          <TocList activeId={activeId} filteredToc={filteredToc} />
        </div>
      </div>
    </>
  );
}
