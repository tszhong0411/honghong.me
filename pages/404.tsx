import { Box } from '@/components/Box'
import Container from '@/components/Container'
import { Flex } from '@/components/Flex'
import Link from '@/components/Link'
import { Text } from '@/components/Text'
import useTranslation from 'next-translate/useTranslation'
import { Button } from '@/components/Button'

export default function FourZeroFour() {
  const { t } = useTranslation()

  return (
    <Container title="404 - 小康">
      <Flex
        direction={'column'}
        alignItems={'flex-start'}
        css={{
          my: '$12',
          '@md': {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            spaceX: '$5',
          },
        }}
      >
        <Box
          css={{
            spaceX: '$2',
            pt: '$5',
            pb: '$6',
            '@md': {
              spaceY: 'calc($5 - 4px)',
            },
          }}
        >
          <Text
            size={10}
            as="h1"
            css={{
              fontWeight: 900,
              letterSpacing: '-0.025em',
              '@md': {
                borderRightWidth: '$space$2',
                px: '$5',
                fontSize: '$8xl',
              },
            }}
          >
            404
          </Text>
        </Box>
        <Box css={{ maxWidth: '$max-w-md' }}>
          <Text
            size={5}
            as="p"
            css={{
              mb: '$4',
              fontWeight: 700,
              '@md': {
                fontSize: '$2xl',
              },
            }}
          >
            {t('404:bigText')}
          </Text>
          <Text size={3} as="p" css={{ mb: '$6' }}>
            {t('404:littleText')}
          </Text>
          <Link href="/">
            <Button
              css={{
                display: 'inline',
                borderRadius: '$3',
                px: '$4',
                py: '$2',
                width: 'calc($11 + 12px)',
                fontSize: '$sm',
                fontWeight: 500,
              }}
              variant="blue"
            >
              {t('404:backButton')}
            </Button>
          </Link>
        </Box>
      </Flex>
    </Container>
  )
}
