import {
  AlertProps,
  Blockquote,
  Box,
  Center,
  Kbd,
  Alert as MantineAlert,
  Table,
  TableProps,
  Text,
} from '@mantine/core'
import Image, { ImageProps } from 'next/image'
import React from 'react'

import CustomLink from '@/components/Link'
import Pre from '@/components/Pre'

const PostImage = (props: ImageProps) => (
  <Box
    component='figure'
    sx={{
      '& img': {
        borderRadius: 12,
      },
    }}
  >
    <Center>
      <Image alt={props.alt} {...props} />
    </Center>
    <Text
      component='figcaption'
      size='sm'
      align='center'
      sx={(theme) => ({
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[2]
            : theme.colors.gray[7],
        marginTop: theme.spacing.xs,
      })}
    >
      {props.alt}
    </Text>
  </Box>
)

const PostTable = (props: TableProps) => (
  <Table highlightOnHover>{props.children}</Table>
)

const Alert = (props: AlertProps) => (
  <MantineAlert my={16} {...props}>
    {props.children}
  </MantineAlert>
)

const MDXComponents = {
  Kbd,
  Pre,
  Blockquote,
  Alert,
  a: CustomLink,
  table: PostTable,
  Image: PostImage,
}

export default MDXComponents
