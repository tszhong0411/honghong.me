/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert as MantineAlert,
  AlertProps,
  Blockquote,
  Box,
  Center,
  Kbd,
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
      <Image
        alt={props.alt}
        src={props.src}
        blurDataURL={`/_next/image?url=${props.src}&w=16&q=1`}
        placeholder='blur'
        {...props}
      />
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

const PostPre = (props: any) => {
  const matches = (props.children.props.className || '').match(
    /language-(?<lang>.*)/
  )

  return (
    <Pre
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ''
      }
      withLineNumbers={props.children.props.className ? true : false}
    >
      {props.children.props.children}
    </Pre>
  )
}

const MDXComponents = {
  Kbd,
  pre: PostPre,
  Blockquote,
  Alert,
  a: CustomLink,
  table: PostTable,
  Image: PostImage,
}

export default MDXComponents
