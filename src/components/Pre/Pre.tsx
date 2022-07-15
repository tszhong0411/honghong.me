// import useTranslation from 'next-translate/useTranslation';
import { Prism } from '@mantine/prism'
import PrismRenderer from 'prism-react-renderer/prism'

import { PreProps } from '@/components/Pre/types'
;(typeof global !== 'undefined' ? global : window).Prism = PrismRenderer

require('prismjs/components/prism-php')
require('prismjs/components/prism-bash')

const Pre = ({ children, language, sx, ...props }: PreProps) => {
  return (
    <Prism
      withLineNumbers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      language={language as any}
      sx={{
        ...sx,
      }}
      styles={(theme) => ({
        lineNumber: {
          marginRight: 24,
          color: theme.colorScheme === 'dark' ? 'white' : 'black',
        },
        line: {
          '&:hover': {
            backgroundColor: 'rgba(239,68,68,.1)',
          },
        },
      })}
      {...props}
    >
      {children}
    </Prism>
  )
}

export default Pre
