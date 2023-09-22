import React from 'react'

/**
 * A hook that tracks which element is currently in view based on scroll position.
 * @param ids - An array of element IDs to track.
 * @param options - Options for the IntersectionObserver.
 * @returns The ID of the currently active element.
 */
const useScrollspy = (ids: string[], options: IntersectionObserverInit) => {
  const [activeId, setActiveId] = React.useState<string>()
  const observer = React.useRef<IntersectionObserver>()

  React.useEffect(() => {
    const elements = ids.map((id) => document.querySelector(`#${id}`))

    if (observer.current) {
      observer.current?.disconnect()
    }

    observer.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }, options)

    for (const el of elements) {
      el && observer.current?.observe(el)
    }

    return () => observer.current?.disconnect()
  }, [ids, options])

  return activeId
}

export default useScrollspy
