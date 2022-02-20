/**
 * @typedef TocHeading
 * @prop {string} value
 * @prop {number} depth
 * @prop {string} url
 */

import useTranslation from "next-translate/useTranslation";

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
const TOCInline = ({ toc, fromHeading = 1, toHeading = 6, exclude = "" }) => {
    const { t } = useTranslation();
    const re = Array.isArray(exclude)
        ? new RegExp("^(" + exclude.join("|") + ")$", "i")
        : new RegExp("^(" + exclude + ")$", "i");
    const filteredToc = toc.filter(
        (heading) =>
            heading.depth >= fromHeading &&
            heading.depth <= toHeading &&
            !re.test(heading.value),
    );

    const tocList = (
        <ul>
            {filteredToc.map((heading) => {
                return (
                    <li
                        key={heading.value}
                        style={{ marginLeft: (heading.depth - 2) * 16 }}
                    >
                        <a href={heading.url}>{heading.value}</a>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <>
            <details className="mt-5 mb-14 rounded-xl dark:bg-[#191919] xl:hidden">
                <summary className="ml-2 pt-2 pb-2 text-xl font-bold sm:ml-6">
                    {t("common:toc")}
                </summary>
                <div className="ml-2 sm:ml-6">{tocList}</div>
            </details>
        </>
    );
};

export default TOCInline;
