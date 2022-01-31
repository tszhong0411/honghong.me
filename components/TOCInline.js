/**
 * @typedef TocHeading
 * @prop {string} value
 * @prop {number} depth
 * @prop {string} url
 */

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {{
 *  toc: TocHeading[],
 *  fromHeading?: number,
 *  toHeading?: number,
 *  asDisclosure?: boolean,
 *  exclude?: string|string[]
 * }} props
 *
 */
const TOCInline = ({ toc, fromHeading = 1, toHeading = 6, asDisclosure = false, exclude = '' }) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')
  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const tocList = (
    <ul>
      {filteredToc.map((heading) => {
        let csName
        switch (heading.depth) {
          case 1:
            csName = ''
            break
          case 2:
            csName = 'ml-6'
            break
          case 3:
            csName = 'ml-[48px]'
            break
          default:
            break
        }
        return (
          <li key={heading.value} className={`${csName}`}>
            <a href={heading.url}>{heading.value}</a>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      {asDisclosure ? (
        <details open className="my-5 rounded-xl dark:bg-[#191919]">
          <summary className="ml-2 pt-2 pb-2 text-xl font-bold sm:ml-6">目錄</summary>
          <div className="ml-2 sm:ml-6">{tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  )
}

export default TOCInline
