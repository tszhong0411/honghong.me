import { Button } from '@mantine/core'
import { motion } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { ArrowRight } from 'tabler-icons-react'

import Link from '@/components/Link'

import useStyles from './NextPrevPost.styles'

interface Props {
  heading: string
  title: string
  summary: string
  slug: string
}

export default function NextPrevPost({ heading, title, summary, slug }: Props) {
  const { t } = useTranslation()
  const [hover, setHover] = React.useState<boolean>(false)
  const { classes } = useStyles()

  return (
    <div className={classes.wrapper}>
      <span className={classes.heading}>{heading}</span>
      <Link href={`/blog/${slug}`} className={classes.title}>
        {title}
      </Link>
      <div className={classes.summary}>
        <p>{summary}</p>
      </div>
      <Button
        component={Link}
        href={`/blog/${slug}`}
        aria-label={`Read "${title}"`}
        rightIcon={
          <motion.div animate={{ x: hover ? 5 : 0 }}>
            <ArrowRight size={20} />
          </motion.div>
        }
        sx={{
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'none',
          },
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {t('common:readMore')}
      </Button>
    </div>
  )
}
