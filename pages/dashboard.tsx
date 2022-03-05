import useTranslation from 'next-translate/useTranslation'

import Youtube from '@/components/metrics/Youtube'
import Github from '@/components/metrics/Github'
import BlogTotalViews from '@/components/metrics/BlogTotalViews'
import TopTracks from '@/components/TopTracks'
import Container from '@/components/Container'
import { Flex } from '@/components/Flex'
import { Text } from '@/components/Text'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { t } = useTranslation()
  const router = useRouter()

  const description = {
    'zh-TW':
      '這是我的個人儀表板，使用 Next.js API routes 部署為 serverless functions。我用這個儀表板以跟踪跨平台的各種指標，例如 YouTube、GitHub 等。',
    en: 'This is my personal dashboard, built with Next.js API routes deployed as serverless functions. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more.',
  }

  return (
    <Container title="Dashboard - 小康" description={description}>
      <Flex justifyContent={'center'} direction={'column'} css={{ mx: 'auto' }}>
        <Text
          size={7}
          as="h1"
          css={{
            mb: '$8',
            fontWeight: 700,
            '@md': {
              fontSize: '$5xl',
            },
          }}
        >
          Dashboard
        </Text>
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
        <Flex direction={'column'} css={{ width: '100%' }}>
          <Youtube />
          <Github />
          <BlogTotalViews />
        </Flex>
        <Text
          size={7}
          as="h2"
          css={{
            mb: '$4',
            mt: '$8',
            fontWeight: 700,
          }}
        >
          {t('dashboard:spotifyTitle')}
        </Text>
        <TopTracks />
      </Flex>
    </Container>
  )
}
