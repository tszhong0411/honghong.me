import { Box } from '@mantine/core'
import { IconFileText, IconFolder } from '@tabler/icons'
import React from 'react'

import { useStyles } from './Files.styles'

type Node = {
  name: string
  isHighlighted?: boolean
  children?: Array<Node>
}

type FilesProps = {
  data: Array<Node>
  title?: string
}

type InnerProps = {
  data: Array<Node>
  lvl: number
}

export default function Files({ data, title }: FilesProps) {
  const { classes, cx } = useStyles()

  return (
    <div className={classes.root}>
      {title && <div className={classes.title}>{title}</div>}
      <div className={cx(classes.inner, { [classes.hasTitle]: title })}>
        <Inner data={data} lvl={0} />
      </div>
    </div>
  )
}

const Inner = ({ data, lvl }: InnerProps) => {
  const { classes, cx } = useStyles()

  return (
    <>
      {data.map(({ name, isHighlighted, children }) => (
        <React.Fragment key={name}>
          <div
            className={cx(classes.line, {
              [classes.highlight]: isHighlighted,
            })}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                marginLeft: lvl * 20,
              }}
            >
              {!children ? (
                <IconFileText size={16} />
              ) : (
                <IconFolder size={16} />
              )}
            </Box>
            <Box ml={8}>{name}</Box>
          </div>

          {children && <Inner data={children} lvl={lvl + 1} />}
        </React.Fragment>
      ))}
    </>
  )
}
