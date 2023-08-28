import React from 'react'

export const useScrollspy = (
  ids: string[],
  options: IntersectionObserverInit
) => {
  const [activeId, setActiveId] = React.useState<string>()
  const observer = React.useRef<IntersectionObserver>()

  React.useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id))

    if (observer.current) {
      observer.current?.disconnect()
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, options)

    elements.forEach((el) => {
      el && observer.current?.observe(el)
    })

    return () => observer.current?.disconnect()
  }, [ids, options])

  return activeId
}
