import { Box } from '@mantine/core'

import Link from '@/components/Link'
import { useStyles } from '@/components/Link/TOCLink.styles'
import { TOCLinkProps } from '@/components/Link/types'

export const TOCLink = ({
  id,
  level,
  minLevel,
  text,
  activeSection,
}: TOCLinkProps) => {
  const { classes, cx } = useStyles()

  return (
    <Box
      component={Link}
      href={`#${id}`}
      className={cx(classes.link, {
        [classes.linkActive]: activeSection === id,
      })}
      sx={(theme) => ({
        paddingLeft: (level - minLevel + 1) * theme.spacing.md,
      })}
    >
      {text}
    </Box>
  )
}
