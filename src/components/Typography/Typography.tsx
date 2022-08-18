import { Box, useMantineTheme } from '@mantine/core'
import React, { PropsWithChildren } from 'react'

export default function Typography({ children }: PropsWithChildren) {
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
          lineHeight: '1.75rem',

          [theme.fn.largerThan('sm')]: {
            fontSize: '1.5rem',
            lineHeight: '2rem',
          },
        },
        '& a': {
          color: dark ? '#fb5151' : '#f90606',
          fontWeight: 500,
          touchAction: 'manipulation',
          textDecoration: 'none !important',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.3s ease 0s, color 0.3s ease 0s',

          '&:hover': {
            borderBottomColor: '#fa3838',
          },
        },
        '& pre': {
          fontFamily: 'Fira Code, Noto Sans TC, Inter',
        },
        '& > p': {
          color: dark ? '#a1a1aa' : '#374151',
          fontSize: '1rem',
          lineHeight: 1.9,
          marginTop: '1.1428571em',
          marginBottom: '1.1428571em',
          letterSpacing: 0.3,

          [theme.fn.largerThan('sm')]: {
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            marginTop: '1.25em',
            marginBottom: '1.25em',
          },
        },
        '& :is(ol, ul)': {
          paddingLeft: '1.625em',
        },
        '& li': {
          paddingLeft: '.4285714em',
          marginTop: '.2857143em',
          marginBottom: '.2857143em',
          letterSpacing: 0.3,

          [theme.fn.largerThan('sm')]: {
            paddingLeft: '0.375em',
            marginTop: '0.5em',
            marginBottom: '0.5em',
          },
        },
        '& li::marker': {
          color: dark ? '#fb5151' : '#f90606',
        },
        '& code': {
          lineHeight: '1.45rem',
          fontFamily: 'Fira Code, Noto Sans TC, Inter',
          borderRadius: 8,
          color: dark ? '#fb6a6a' : '#f90606',
          backgroundColor: dark
            ? 'rgba(43, 48, 59, 0.6)'
            : 'rgba(240, 241, 244, 0.6)',
          padding: '2px 8px',
          fontSize: 14,
          border: `1px solid ${dark ? '#2b303b' : 'rgba(249, 6, 6, 0.05)'}`,
          boxShadow: `0.5px 1px 1px ${
            dark ? 'rgba(2, 2, 3, 0.33)' : 'rgba(201, 203, 207, 0.33)'
          }`,
        },
        '& :is(h2, h3)': {
          position: 'relative',
          scrollMarginTop: 128,
        },
        '& :is(h2,h3) > a': {
          width: '100%',
          position: 'absolute',
          inset: 0,
          borderBottomColor: 'transparent !important',

          '&:hover > svg': {
            visibility: 'visible',
          },

          '& svg': {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block',
            fontWeight: 400,
            right: '100%',
            top: '50%',
            width: 28,
            height: 20,
            color: dark ? '#71717a' : '#a1a1aa',
            transform: 'translateY(-50%)',
          },
        },
        '& figure': {
          margin: '24px 0',
        },
      })}
    >
      {children}
    </Box>
  )
}
