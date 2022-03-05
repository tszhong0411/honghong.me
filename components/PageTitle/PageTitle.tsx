import { ReactNode } from 'react'
import { Text } from '../Text'
interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <Text
      size={7}
      as="h1"
      css={{
        mb: '$6',
        fontWeight: 700,
        '@md': {
          fontSize: '$5xl',
        },
      }}
    >
      {children}
    </Text>
  )
}
