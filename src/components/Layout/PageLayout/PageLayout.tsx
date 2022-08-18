import { Title } from '@mantine/core'

import { useStyles } from '@/components/Layout/PageLayout/PageLayout.styles'
import { PageLayoutProps } from '@/components/Layout/PageLayout/types'

export default function PageLayout({
  children,
  title,
  description,
}: PageLayoutProps) {
  const { classes } = useStyles()

  return (
    <div className={classes.layout}>
      <Title order={1} className={classes.title}>
        {title}
      </Title>
      <p className={classes.description}>{description}</p>
      {children}
    </div>
  )
}
