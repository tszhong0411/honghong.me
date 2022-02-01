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
 *  mobile?: boolean,
 *  toHeading?: number,
 *  exclude?: string|string[]
 * }} props
 *
 */
const TOCInline = ({ toc, fromHeading = 1, toHeading = 6, mobile = false, exclude = '' }) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')
  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )
  const scrollHeading = (name, e) => {
    e.preventDefault()
    var element = document.querySelector(`#${name}`)
    var headerOffset = document.querySelector('header').offsetHeight
    var elementPosition = element.getBoundingClientRect().top
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
  const mobileTocList = (
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
            <a
              href={heading.url}
              onClick={(e) => {
                scrollHeading(heading.url.replace('#', ''), e)
              }}
            >
              {heading.value}
            </a>
          </li>
        )
      })}
    </ul>
  )

  const tocList = (
    <div className="mt-1 transform space-y-1 transition duration-500 ease-in-out">
      {filteredToc.map((heading) => {
        let csName
        switch (heading.depth) {
          case 1:
            csName = ''
            break
          case 2:
            csName = 'ml-3'
            break
          case 3:
            csName = 'ml-6'
            break
          default:
            break
        }
        return (
          <div key={heading.value} className={`${csName} transition-all duration-500 ease-in-out`}>
            <a
              href={heading.url}
              onClick={(e) => {
                scrollHeading(heading.url.replace('#', ''), e)
              }}
              className="text-red-500 hover:text-red-600"
            >
              {heading.value}
            </a>
          </div>
        )
      })}
    </div>
  )

  return (
    <>
      {mobile ? (
        <details open className="mt-5 mb-14 rounded-xl dark:bg-[#191919] xl:hidden">
          <summary className="ml-2 pt-2 pb-2 text-xl font-bold sm:ml-6">目錄</summary>
          <div className="ml-2 sm:ml-6">{mobileTocList}</div>
        </details>
      ) : (
        <div className="mt-10 hidden xl:block" id="toc">
          <div className="mb-4 text-sm tracking-tight text-gray-500 dark:text-gray-500">
            <p className="mb-2 text-xl font-bold">目錄</p>
            {tocList}
          </div>
        </div>
      )}
    </>
  )
}

export default TOCInline
