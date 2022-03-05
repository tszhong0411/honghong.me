import { useRouter } from 'next/router'
import { Box } from '../Box'
import { Flex } from '../Flex'
import { Text } from '../Text'

export default function PageContainer(props) {
  const { title, description, children } = props
  const router = useRouter()

  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      css={{
        mx: 'auto',
      }}
    >
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
        {title}
      </Text>
      {description && (
        <Text
          size={3}
          as="p"
          css={{
            mb: '$8',
            color: '$honghong-colors-typeface-secondary',
          }}
        >
          {description[router.locale]}
        </Text>
      )}
      <Box
        css={{
          pb: '$8',
          maxWidth: '100%',
        }}
      >
        <div>{children}</div>
      </Box>
    </Flex>
  )
}
