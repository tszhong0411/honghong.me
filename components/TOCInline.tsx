/**
 * @typedef TocHeading
 * @prop {string} value
 * @prop {number} depth
 * @prop {string} url
 */

import { useEffect } from 'react'

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
const TOCInline = ({ toc, fromHeading = 1, toHeading = 6, exclude = '' }) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')
  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )
  const scrollHeading = (url, e) => {
    e.preventDefault()
    var element = document.querySelector(url)
    var headerOffset = document.querySelector('header').offsetHeight
    var elementPosition = element.getBoundingClientRect().top
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }

  const tocList = (
    <ul>
      {filteredToc.map((heading) => {
        console.log(heading)
        return (
          <li key={heading.value} style={{ marginLeft: (heading.depth - 1) * 16 }}>
            <a
              href={heading.url}
              onClick={(e) => {
                scrollHeading(heading.url, e)
              }}
            >
              {heading.value}
            </a>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      <details open className="mt-5 mb-14 rounded-xl dark:bg-[#191919] xl:hidden">
        <summary className="ml-2 pt-2 pb-2 text-xl font-bold sm:ml-6">目錄</summary>
        <div className="ml-2 sm:ml-6">{tocList}</div>
      </details>
    </>
  )
}

export default TOCInline
