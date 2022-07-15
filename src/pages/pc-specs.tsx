import { Table } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'

import { PcSpecsType } from '@/lib/types'

import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'

export default function PcSpecs() {
  const { t } = useTranslation()

  //#region  //*=========== PC Specs list ===========
  const pcSpecsList: PcSpecsType[] = [
    {
      name: 'CPU',
      content: 'i5 10400F',
    },
    {
      name: 'RAM',
      content: '16GB (2 x 8GB) G.SKILL',
    },
    {
      name: 'Motherboard',
      content: 'Gigabyte B460M DS3H AC',
    },
    {
      name: 'Graphics card',
      content: 'NVIDIA GeForce GTX 1660 SUPER',
    },
    {
      name: 'SSD',
      content: '500GB WD Blue SN550 NVMe',
    },
    {
      name: 'HDD',
      content: 'WD 1TB 7200 RPM SATA',
    },
    {
      name: 'Cooler',
      content: 'Cooler master hyper H410R White edition',
    },
    {
      name: 'PSU',
      content: 'FSP Hydro 700 80Plus Bronze',
    },
  ]
  //#endregion  //*======== PC Specs list ===========

  const rows = pcSpecsList.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.content}</td>
    </tr>
  ))

  return (
    <Layout templateTitle='PC Specs' description={t('common:SEO_pcSpecsDesc')}>
      <PageLayout
        title='PC Specification'
        description={t('common:SEO_pcSpecsDesc')}
      >
        <Table verticalSpacing='sm' fontSize='md' striped highlightOnHover>
          <thead>
            <tr>
              <th>Hardware</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </PageLayout>
    </Layout>
  )
}
