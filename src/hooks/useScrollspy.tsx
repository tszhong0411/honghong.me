import throttle from 'lodash/throttle'
import React from 'react'

export default function useScrollSpy() {
  const [activeSection, setActiveSection] = React.useState<string | null>(null)
  const throttleMs = 100

  const actionSectionScrollSpy = throttle(() => {
    const sections = document.getElementsByClassName('activeSection')

    let prevBBox = null
    let currentSectionId = activeSection

    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i]

      if (!currentSectionId) {
        currentSectionId = section.getAttribute('href')?.split('#')[1] ?? null
      }

      const bbox = section.getBoundingClientRect()

      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
      const offset = Math.max(200, prevHeight / 4)

      if (bbox.top - offset < 0) {
        currentSectionId = section.getAttribute('href')?.split('#')[1] ?? null

        prevBBox = bbox
        continue
      }

      break
    }

    setActiveSection(currentSectionId)
  }, throttleMs)

  React.useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)

    actionSectionScrollSpy()

    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return activeSection
}
