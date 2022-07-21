import { Box, useMantineTheme } from '@mantine/core'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { CloudinaryImg } from '@/components/Image'
import Kbd from '@/components/Kbd'
import CustomLink from '@/components/Link'
import Pre from '@/components/Pre'
import Table from '@/components/Table'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'

const MDXComponents = {
  CloudinaryImg,
  YouTubeEmbed,
  Kbd,
  Pre,
  a: CustomLink,
  table: Table,
}

export default MDXComponents

export const MDXComponent = ({ code }) => {
  const Component = useMDXComponent(code)
  const { colorScheme } = useMantineTheme()
  const dark = colorScheme === 'dark'

  return (
    <Box
      sx={(theme) => ({
        '& > h2:nth-of-type(1)': {
          marginTop: 0,
        },
        '& h2': {
          fontWeight: 800,
          color: dark ? '#ffffff' : '#111827',
          margin: '3rem 0 1.5rem 0',
          fontSize: '1.4rem',
          letterSpacing: '-.05em',
          lineHeight: 1.4,

          [theme.fn.largerThan('sm')]: {
            fontSize: '1.8rem',
          },
        },
        '& :is(h2+*)': {
          marginTop: 0,
        },
        '& h3': {
          fontWeight: 800,
          color: dark ? '#ffffff' : '#111827',
          marginTop: 35,
          marginBottom: 10,
          fontSize: '1.25rem',
          letterSpacing: '-.025em',
          lineHeight: '1.75rem',

          [theme.fn.largerThan('sm')]: {
            fontSize: '1.5rem',
            lineHeight: '2rem',
          },
        },
        '& a': {
          color: dark ? '#ffffff' : '#111827',
          fontWeight: 500,
          textDecoration: 'underline',
          touchAction: 'manipulation',
        },
        '& pre': {
          fontFamily: 'Fira Code,Noto Sans TC,Inter',
        },
        '& p': {
          color: dark ? '#a1a1aa' : '#374151',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          marginTop: '1.1428571em',
          marginBottom: '1.1428571em',
          [theme.fn.largerThan('sm')]: {
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            marginTop: '1.25em',
            marginBottom: '1.25em',
          },
        },
        '& :is(ol, ul)': {
          listStyleType: 'disc',
          paddingLeft: '1.625em',
        },
        '& li': {
          paddingLeft: '.4285714em',
          marginTop: '.2857143em',
          marginBottom: '.2857143em',

          [theme.fn.largerThan('sm')]: {
            paddingLeft: '0.375em',
            marginTop: '0.5em',
            marginBottom: '0.5em',
          },
        },
        '& ul > li::marker': {
          color: '#d1d5db',
        },
        '& p code': {
          color: '#e3371e',
          backgroundColor: dark ? '#2a0000' : '#ef44441a',
          fontFamily: 'Fira Code,Noto Sans TC,Inter',
          fontWeight: 600,
          fontSize: 14,
          border: dark ? '1px solid #5f0000' : '1px solid #eee',
          borderRadius: 8,
          padding: '2px 8px',
        },
        '& :is(h2, h3)': {
          position: 'relative',
          scrollMarginTop: 128,
        },
        '& :is(h2,h3) > a': {
          width: '100%',
          position: 'absolute',
          inset: 0,
          '&:hover > .anchor': {
            visibility: 'visible',
          },
        },
        '& .anchor': {
          position: 'absolute',
          visibility: 'hidden',
          display: 'block',
          fontWeight: 400,
          paddingRight: '0.5rem',
          bottom: '0.5rem',
          right: '100%',
          width: 32,
          height: 24,
          color: dark ? '#71717a' : '#a1a1aa',
        },
        // TODO: waiting for edit
      })}
    >
      <Component components={MDXComponents} />
    </Box>
  )
}
