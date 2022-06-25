import { useRouter } from 'next/router';

import Container from '@/components/Container';
import PageContainer from '@/components/PageContainer';

export default function PcSpecs() {
  const router = useRouter();

  const description = {
    'zh-TW': '小康在 2021 年 4 月購買的電腦的配置',
    en: 'Specification of PC bought by 小康 in April 2021',
  };

  const title = {
    'zh-TW': '電腦配置',
    en: 'PC Specs',
  };

  //#region  //*=========== PC Specs list ===========
  const pcSpecsList = [
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
  ];
  //#endregion  //*======== PC Specs list ===========

  return (
    <Container title='PC Specs - 小康'>
      <PageContainer title={title[router.locale]} description={description}>
        <div className='flex flex-wrap'>
          <table className='m-auto w-full table-fixed'>
            <thead>
              <tr>
                <th className='w-1/4 border border-gray-500 py-4'>Hardware</th>
                <th className='w-1/4 border border-gray-500 py-4'>Model</th>
              </tr>
            </thead>
            <tbody>
              {pcSpecsList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className='border border-gray-500 p-4 font-medium'>
                      {item.name}
                    </td>
                    <td className='border border-gray-500 p-4 font-medium '>
                      {item.content}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PageContainer>
    </Container>
  );
}
