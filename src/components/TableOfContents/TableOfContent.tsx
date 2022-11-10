import { Group, Text } from '@mantine/core'
import { IconListSearch } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { TOCLink } from '@/components/Link'

export type HeadingScrollSpy = {
  id: string
  level: number
  text: string
}[]

type TableOfContentsProps = {
  toc?: HeadingScrollSpy
  activeSection: string | null
  minLevel: number
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc, activeSection, minLevel } = props
  const lastPosition = React.useRef<number>(0)
  const { t } = useTranslation('common')

  React.useEffect(() => {
    const container = document.getElementById('toc-container')
    const activeLink = document.getElementById(`link-${activeSection}`)

    if (container && activeLink) {
      const cTop = container.scrollTop
      const cBottom = cTop + container.clientHeight

      const lTop = activeLink.offsetTop - container.offsetTop
      const lBottom = lTop + activeLink.clientHeight

      const isTotal = lTop >= cTop && lBottom <= cBottom

      const isScrollingUp = lastPosition.current > window.scrollY
      lastPosition.current = window.scrollY

      if (!isTotal) {
        const offset = 25
        const top = isScrollingUp
          ? lTop - container.clientHeight + offset
          : lTop - offset

        container.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }, [activeSection])

  return (
    <div id='toc-container'>
      <Group mb='md'>
        <IconListSearch size={18} />
        <Text>{t('toc')}</Text>
      </Group>
      <div>
        {toc &&
          toc.map(({ id, level, text }) => (
            <TOCLink
              id={id}
              key={id}
              activeSection={activeSection}
              level={level}
              minLevel={minLevel}
              text={text}
            />
          ))}
      </div>
    </div>
  )
}

export default TableOfContents
