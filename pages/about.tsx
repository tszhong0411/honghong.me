import Container from '@/components/Container'
import PageContainer from '@/components/PageContainer'
import Link from '@/components/Link'
import { Box } from '@/components/Box'
import { PostCSS } from '@/components/Typography'
import { Flex } from '@/components/Flex'

export default function About() {
  return (
    <Container title="About - 小康">
      <PageContainer title="About">
        <Box css={{ maxWidth: 'none', py: '$6' }} className={PostCSS()}>
          <p>
            我是一名學生。為了挑戰新事物我在 2020 年 12 月開始學習 Web 開發，我在 Youtube 上找到{' '}
            <Link href="https://www.youtube.com/c/TheNetNinja">The Net Ninja</Link> 並從中學習 Web
            開發，我擁有超過 1 年的網頁開發經驗 :)
          </p>
          <p>
            我最喜歡使用 <Link href="https://nextjs.org/">Next.js</Link> 框架，{' '}
            <Link href="https://stitches.dev/">Stitches</Link> css-in-js。用{' '}
            <Link href="https://github.com/">Github</Link> 儲存原始碼。並用{' '}
            <Link href="https://vercel.com/">Vercel</Link> 部署我的網站。
          </p>
          <p>
            <Flex alignItems={'center'} inlineFlex css={{ color: '$honghong-colors-brand' }}>
              ❤️
            </Flex>{' '}
            我喜歡玩電子遊戲、編寫網頁、學習程式設計。
          </p>
          <p>
            看看我的電腦配置: <Link href="/pc-specs">💻 PC</Link>
          </p>
        </Box>
      </PageContainer>
    </Container>
  )
}
