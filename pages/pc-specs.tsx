import { useRouter } from 'next/router'

import Container from '@/components/Container'
import PageContainer from '@/components/PageContainer'
import { pcSpecsList } from '@/data/pcSpecsList'
import { Flex } from '@/components/Flex'
import { Box } from '@/components/Box'

export default function PcSpecs() {
  const router = useRouter()

  const description = {
    'zh-TW': '小康在 2021 年 4 月購買的電腦的配置',
    en: 'Specification of PC bought by 小康 in April 2021',
  }

  const title = {
    'zh-TW': '電腦配置',
    en: 'PC Specs',
  }

  return (
    <Container title="PC Specs - 小康">
      <PageContainer title={title[router.locale]} description={description}>
        <Flex wrap={'wrap'}>
          <Box as="table" css={{ m: 'auto', width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <Box
                  as="th"
                  css={{
                    width: 'calc(100% * (1/4))',
                    border: '1px',
                    py: '$4',
                    borderColor: '$honghong-colors-border-primary',
                    backgroundColor: '$honghong-colors-body-secondary',
                  }}
                >
                  Hardware
                </Box>
                <Box
                  as="th"
                  css={{
                    width: 'calc(100% * (1/4))',
                    border: '1px',
                    py: '$4',
                    borderColor: '$honghong-colors-border-primary',
                    backgroundColor: '$honghong-colors-body-secondary',
                  }}
                >
                  Model
                </Box>
              </tr>
            </thead>
            <tbody>
              {pcSpecsList.map((item, index) => {
                return (
                  <tr key={index}>
                    <Box
                      as="td"
                      css={{
                        borderWidth: '1px',
                        borderColor: '$honghong-colors-border-primary',
                        p: '$4',
                        fontWeight: 500,
                        backgroundColor: '$honghong-colors-body-secondary',
                      }}
                    >
                      {item.name}
                    </Box>
                    <Box
                      as="td"
                      css={{
                        borderWidth: '1px',
                        borderColor: '$honghong-colors-border-primary',
                        p: '$4',
                        fontWeight: 500,
                        backgroundColor: '$honghong-colors-body-secondary',
                      }}
                    >
                      {item.content}
                    </Box>
                  </tr>
                )
              })}
            </tbody>
          </Box>
        </Flex>
      </PageContainer>
    </Container>
  )
}
