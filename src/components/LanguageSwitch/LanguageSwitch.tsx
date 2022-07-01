import cn from 'classnames';
import { default as emojiUnicode } from 'emoji-unicode';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { IoLanguageOutline } from 'react-icons/Io5';
import { useLocalStorage } from 'react-use';

import i18nConfig from '@/lib/i18n';

export default function LanguageSwitch() {
  const router = useRouter();
  const [locale, setLocale] = useLocalStorage('locale');
  const { locales, languages, defaultLocale } = i18nConfig;

  // Redirect router when locale not set in 'localstorage'
  React.useEffect(() => {
    if (typeof locale === 'string' && locale !== router.locale) {
      locale !== defaultLocale &&
        router.push(router.asPath, router.asPath, { locale });
    }
  }, [defaultLocale, locale, locales, router]);

  const changeLanguage = (locale: string) => {
    setLocale(locale);
    router.push(router.asPath, router.asPath, { locale });
  };

  return (
    <div className='dropdown-end dropdown'>
      <div tabIndex={0} className='btn btn-ghost gap-1 normal-case'>
        <IoLanguageOutline />
        <FaAngleDown />
      </div>
      <div className='dropdown-content rounded-t-box rounded-b-box top-px mt-16 w-56 overflow-y-auto bg-base-200 text-base-content shadow-2xl'>
        <ul className='menu menu-compact gap-1 p-3' tabIndex={0}>
          {locales.map((item: string, index: number) => {
            const name = languages[item].name,
              flag = languages[item].flag;

            return (
              <li key={index}>
                <button
                  className={cn('flex', { active: router.locale === item })}
                  onClick={() => changeLanguage(item)}
                >
                  <Image
                    src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${emojiUnicode(
                      flag
                    ).replace(/\s/g, '-')}.svg`}
                    alt={`${name} Flag`}
                    width={40}
                    height={25}
                  />
                  <span className='flex flex-1 justify-between'>{name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
