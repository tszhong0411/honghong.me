import { Group, Text } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { ListSearch } from 'tabler-icons-react'

import { useStyles } from './TableOfContent.styles'
import { TableOfContentsProps } from './types'
import { TOCLink } from '../Link'

export default function TableOfContents({
  toc,
  activeSection,
  minLevel,
}: TableOfContentsProps) {
  //#region  //*=========== Scroll into view ===========
  const lastPosition = React.useRef<number>(0)
  const { classes } = useStyles()
  const { t } = useTranslation()

  React.useEffect(() => {
    const container = document.getElementById('toc-container')
    const activeLink = document.getElementById(`link-${activeSection}`)

    if (container && activeLink) {
      // Get container properties
      const cTop = container.scrollTop
      const cBottom = cTop + container.clientHeight

      // Get activeLink properties
      const lTop = activeLink.offsetTop - container.offsetTop
      const lBottom = lTop + activeLink.clientHeight

      // Check if in view
      const isTotal = lTop >= cTop && lBottom <= cBottom

      const isScrollingUp = lastPosition.current > window.scrollY
      lastPosition.current = window.scrollY

      if (!isTotal) {
        // Scroll by the whole clientHeight
        const offset = 25
        const top = isScrollingUp
          ? lTop - container.clientHeight + offset
          : lTop - offset

        container.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }, [activeSection])
  //#endregion  //*======== Scroll into view ===========

  return (
    <div className={classes.wrapper}>
      <div id='toc-container'>
        <Group mb='md'>
          <ListSearch size={18} />
          <Text>{t('common:toc')}</Text>
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
    </div>
  )
}
