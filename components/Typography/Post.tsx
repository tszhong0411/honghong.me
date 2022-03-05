import { css, darkTheme } from '@/lib/stitches.config'

export const PostCSS = css({
  color: '$honghong-colors-typeface-secondary',
  a: {
    color: '$honghong-colors-brand',
    textDecoration: 'none',
    borderBottom: `2px solid transparent`,
    transition: 'border-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      borderBottom: `2px solid $honghong-colors-brand`,
    },
    code: { color: '$honghong-colors-brand' },
  },
  // Heading
  h2: {
    mt: '$8',
    fontWeight: 700,
    fontSize: '1.5em',
    marginTop: '2em',
    marginBottom: '1em',
    lineHeight: 1.3333333,
    mb: '$5',
  },
  h3: {
    mb: '$3',
    mt: 0,
    fontWeight: 700,
    fontSize: '1.25em',
    marginBottom: '0.6em',
    lineHeight: 1.6,
  },
  'h2,h3,h4': {
    'scroll-margin-top': '8rem',
  },
  'h1,h2,h3,h4,h5,h6': {
    color: '$honghong-colors-typeface-primary',
  },
  pre: {
    backgroundColor: '#24283b',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    color: '#fff',
    background: '#171717',
    fontFamily: 'JetBrains Mono,Noto Sans TC,Inter',
    fontSize: '1em',
    lineHeight: '1.5em',
    '-moz-tab-size': 4,
    '-o-tab-size': 4,
    tabSize: 4,
    '-webkit-hyphens': 'none',
    '-ms-hyphens': 'none',
    hyphens: 'none',
    marginLeft: '0.5rem',
    overflowX: 'auto',
    marginRight: '0.5rem',
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: '0.375rem',
    padding: '0.8571429em 1.1428571em',
    margin: '1.7142857em 0.5rem',
    '& code': {
      padding: 0,
      backgroundColor: '#171717',
    },
  },
  '& p': {
    color: '$honghong-colors-typeface-secondary',
    my: '1.25em',
  },
  code: {
    color: '$honghong-colors-brand',
    backgroundColor: '#f3f3f3',
    paddingLeft: '4px',
    paddingRight: '4px',
    paddingTop: '2px',
    paddingBottom: '2px',
    borderRadius: '0.25rem',
    fontWeight: 700,
    fontSize: '.875em',
    [`.${darkTheme} &`]: {
      backgroundColor: '#171717',
    },
    fontFamily: 'Jetbrains Mono',
  },
  'code::before': {
    content: 'none',
  },
  'code::after': {
    content: 'none',
  },
  details: {
    backgroundColor: '#f3f4f6',
    paddingLeft: '4px',
    paddingRight: '4px',
    paddingTop: '2px',
    paddingBottom: '2px',
    borderRadius: '0.25rem',
  },
  hr: { borderColor: '#e5e7eb' },
  ul: {
    listStyleType: 'disc',
    paddingLeft: '1.625em',
  },
  li: {
    paddingLeft: '0.375em',
    my: '0.5em',
    color: '$honghong-colors-typeface-tertiary',
  },
  'ol li::marker': {
    fontWeight: '600',
    color: '#6b7280',
  },
  'ul li::marker': {
    backgroundColor: '#6b7280',
  },
  strong: { color: '$honghong-colors-typeface-primary' },
  blockquote: {
    color: '#111827',
    borderLeftColor: '#e5e7eb',
  },
  img: {
    borderRadius: '12px',
  },
  // Heading anchor
  '& .anchor': {
    visibility: 'hidden',
    position: 'absolute',
    marginLeft: '-1em',
    paddingRight: '0.5em',
    width: '80%',
    maxWidth: 'calc(768px + 1em)',
    cursor: 'pointer',
    border: '0 !important',
    '&:hover': {
      visibility: 'visible',
      textDecorationLine: 'none',
    },
    '&:after': {
      color: '$honghong-colors-typeface-secondary',
      content: '#',
    },
  },
  '& a.anchor': {
    transition: 'all ease 0.15s',
  },
  '& *:hover > .anchor': {
    visibility: 'visible',
    textDecorationLine: 'none',
  },
})
