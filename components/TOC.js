/**
 * @typedef TocHeading
 * @prop {string} value
 * @prop {number} depth
 * @prop {string} url
 */

import { useEffect } from "react";

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {{
 *  toc: TocHeading[],
 *  fromHeading?: number,
 *  toHeading?: number,
 *  exclude?: string|string[]
 * }} props
 *
 */

export default function TOC({
    toc,
    fromHeading = 1,
    toHeading = 6,
    exclude = "",
}) {
    const re = Array.isArray(exclude)
        ? new RegExp("^(" + exclude.join("|") + ")$", "i")
        : new RegExp("^(" + exclude + ")$", "i");
    const filteredToc = toc.filter(
        (heading) =>
            heading.depth >= fromHeading &&
            heading.depth <= toHeading &&
            !re.test(heading.value)
    );

    const tocList = (
        <div className="mt-1 transform space-y-1 transition duration-500 ease-in-out">
            {filteredToc.map((heading) => {
                return (
                    <div
                        key={heading.value}
                        className={`transition-all duration-500 ease-in-out`}
                        style={{ marginLeft: (heading.depth - 2) * 16 }}
                    >
                        <a
                            href={heading.url}
                            className="text-[#e10000] hover:text-[#b50000] dark:text-[#f20000] dark:hover:text-[#ff6666]"
                        >
                            {heading.value}
                        </a>
                    </div>
                );
            })}
        </div>
    );

    return (
        <>
            <div className="mt-10 hidden xl:block" id="toc">
                <div className="mb-4 text-sm tracking-tight text-gray-500 dark:text-gray-500">
                    <span className="mb-2 text-lg font-bold text-black dark:text-gray-100">
                        目錄
                    </span>
                    {tocList}
                </div>
            </div>
        </>
    );
}
