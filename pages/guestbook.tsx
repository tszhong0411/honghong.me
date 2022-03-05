import prisma from '@/lib/prisma'
import Guestbook from '@/components/Guestbook'
import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import Container from '@/components/Container'
import { Flex } from '@/components/Flex'
import { Text } from '@/components/Text'

export default function GuestbookPage({ fallbackData }) {
  const { t } = useTranslation()

  const description = {
    'zh-TW': '簽到我的訪客留言簿和分享你的想法。',
    en: 'Sign my guestbook and share your idea.',
  }

  return (
    <Container title="Guestbook - 小康" description={description}>
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
            fontWeight: 700,
            mb: '$6',
            '@md': {
              fontSize: '$5xl',
            },
          }}
        >
          Guestbook
        </Text>
        <Text size={3} as="p" css={{ mb: '$8', color: '$honghong-colors-typeface-secondary' }}>
          {t('guestbook:description')}
        </Text>
        <Guestbook fallbackData={fallbackData} />
      </Flex>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  })

  const fallbackData = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString(),
  }))

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  }
}
