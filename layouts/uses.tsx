import { useRouter } from 'next/router'

import Container from '@/components/Container'
import { Flex } from '@/components/Flex'
import { Text } from '@/components/Text'
import { Box } from '@/components/Box'
import { PostCSS } from '@/components/Typography'

export default function Uses({ children }) {
  const router = useRouter()
  const description = {
    'zh-TW': '這是我目前用於遊戲、編程、製作影片和日常的設備。',
    en: 'This is the equipment I currently use for gaming, programming, making videos, and every day.',
  }

  return (
    <Container title="Uses - 小康" description={description}>
      <Flex direction={'column'} css={{ mx: 'auto' }} justifyContent={'center'}>
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
          My Gear
        </Text>
        <Text as="p" size={3} css={{ mb: '$4', color: '$honghong-colors-typeface-tertiary' }}>
          {description[router.locale]}
        </Text>
        <Box css={{ width: '100%' }} className={PostCSS()}>
          {children}
        </Box>
      </Flex>
    </Container>
  )
}
