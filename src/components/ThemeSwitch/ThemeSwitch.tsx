import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { FaAngleDown, FaTags } from 'react-icons/fa';

import ThemesList from '@/components/ThemeSwitch/ThemesList';

const ThemeSwitch = () => {
  const { setTheme } = useTheme();
  const { t } = useTranslation();

  const themeHandler = (item: string) => {
    setTheme(item);
  };

  return (
    <div className='dropdown-end dropdown'>
      <div tabIndex={0} className='btn btn-ghost m-1 gap-2'>
        <FaTags />
        {t('common:theme')}
        <FaAngleDown />
      </div>
      <div className='dropdown-content rounded-t-box rounded-b-box top-px mt-16 max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl'>
        <div className='grid grid-cols-1 gap-3 p-3' tabIndex={0}>
          {ThemesList.map((item, index) => (
            <div
              className='overflow-hidden rounded-lg'
              key={index}
              onClick={() => themeHandler(item)}
            >
              <div
                data-theme={item}
                className='w-full cursor-pointer bg-base-100 font-sans text-base-content'
              >
                <div className='grid grid-cols-5 grid-rows-3'>
                  <div className='col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4'>
                    <div className='flex-grow text-sm font-bold'>{item}</div>
                    <div className='flex flex-shrink-0 flex-wrap gap-1'>
                      <div className='bg-primary w-2 rounded' />
                      <div className='w-2 rounded bg-secondary' />
                      <div className='w-2 rounded bg-accent' />
                      <div className='w-2 rounded bg-neutral' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitch;
