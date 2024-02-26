import * as React from 'react'

export const useScrollspy = (
  ids: string[],
  options: IntersectionObserverInit
): string | undefined => {
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
