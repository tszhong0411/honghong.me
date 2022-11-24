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
import Image, { ImageProps } from 'next/legacy/image'
import React from 'react'

import Files from '@/components/Files'
import CustomLink from '@/components/Link'

import ItemGrid from '../ItemGrid'

const PostImage = ({ alt, src, ...rest }: ImageProps) => (
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
        alt={alt}
        src={src}
        blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
        placeholder='blur'
        {...rest}
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
      {alt}
    </Text>
  </Box>
)

const PostTable = (props: TableProps) => (
  <Table highlightOnHover>{props.children}</Table>
)

const Alert = ({ children, ...rest }: AlertProps) => (
  <MantineAlert my={16} {...rest} variant='outline'>
    {children}
  </MantineAlert>
)

const MDXComponents = {
  Kbd,
  Blockquote,
  Alert,
  Files,
  a: CustomLink,
  table: PostTable,
  Image: PostImage,
  ItemGrid,
}

export default MDXComponents
