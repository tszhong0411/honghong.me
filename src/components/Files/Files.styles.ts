import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  root: {
    overflow: 'hidden',
    borderRadius: '0.5rem',
  },

  title: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    backgroundColor: theme.colorScheme === 'dark' ? '#1d1e22' : '#e7ecf1',
    color: theme.colorScheme === 'dark' ? '#fff' : '#000',
  },

  inner: {
    fontFamily: 'Fira Code, Noto Sans TC, Inter',
    overflowX: 'auto',
    padding: '0.5rem 0',
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    margin: 0,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(43, 48, 59, 0.6)'
        : 'rgba(240, 241, 244, 0.6)',
    borderRadius: 8,
    counterReset: 'lineNumber',
    display: 'grid',
  },

  hasTitle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  line: {
    paddingLeft: '0.5rem',
    paddingRight: '0.75rem',
    borderLeft: '4px solid transparent',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },

    '&::before': {
      counterIncrement: 'lineNumber',
      content: 'counter(lineNumber)',
      display: 'inline-block',
      textAlign: 'right',
      marginRight: '1rem',
      width: '1rem',
      color:
        theme.colorScheme === 'dark'
          ? 'rgb(255 255 255 / 0.2)'
          : 'rgb(0 0 0 / 0.5)',
    },
  },

  highlight: {
    borderLeftColor: 'rgba(239, 68, 68, 0.4)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
}))
