import { Box } from '@mantine/core'

import Link from '@/components/Link'

import { useStyles } from './TOCLink.styles'

type TOCLinkProps = {
  id: string
  level: number
  minLevel: number
  text: string
  activeSection: string | null
}

export const TOCLink = (props: TOCLinkProps) => {
  const { id, level, minLevel, text, activeSection } = props
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
