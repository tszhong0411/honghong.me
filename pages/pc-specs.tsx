import { useRouter } from 'next/router'

import Container from '@/components/Container'
import PageContainer from '@/components/PageContainer'
import { pcSpecsList } from '@/data/pcSpecsList'

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
        <div className="flex flex-wrap">
          <table className="m-auto w-full table-fixed">
            <thead>
              <tr>
                <th className="w-1/4 border border-gray-500 py-4">Hardware</th>
                <th className="w-1/4 border border-gray-500 py-4">Model</th>
              </tr>
            </thead>
            <tbody>
              {pcSpecsList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-gray-500 p-4 font-medium">{item.name}</td>
                    <td className="border border-gray-500 p-4 font-medium ">{item.content}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </PageContainer>
    </Container>
  )
}
