import useTranslation from 'next-translate/useTranslation';

import { pcSpecsType } from '@/lib/types';

import Layout from '@/components/Layout';

export default function PcSpecs() {
  const { t } = useTranslation();

  //#region  //*=========== PC Specs list ===========
  const pcSpecsList: pcSpecsType[] = [
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
    <Layout templateTitle='PC Specs' description={t('common:SEO_pcSpecsDesc')}>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold dark:text-primary-content md:text-5xl'>
          PC Specs
        </h1>
        <p className='mb-12'>{t('common:SEO_pcSpecsDesc')}</p>
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
      </div>
    </Layout>
  );
}
