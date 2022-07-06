import { ActionIcon, Image, Menu } from '@mantine/core';
import { default as emojiUnicode } from 'emoji-unicode';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useLocalStorage } from 'react-use';
import { ChevronDown, Language } from 'tabler-icons-react';

import i18nConfig from '@/lib/i18n';

export default function LanguageSwitch() {
  const router = useRouter();
  const [locale, setLocale] = useLocalStorage('locale');
  const { locales, languages, defaultLocale } = i18nConfig;
  const { t } = useTranslation();

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
    <Menu
      control={
        <ActionIcon
          size='lg'
          radius='md'
          title='Switch language'
          sx={{
            width: 66,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Language size={20} />
          <ChevronDown size={15} />
        </ActionIcon>
      }
    >
      <Menu.Label>{t('common:language')}</Menu.Label>
      {locales.map((item: string, index: number) => {
        const name = languages[item].name,
          flag = languages[item].flag;

        return (
          <Menu.Item
            key={index}
            icon={
              <Image
                src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${emojiUnicode(
                  flag
                ).replace(/\s/g, '-')}.svg`}
                alt={`${name} Flag`}
                width={20}
              />
            }
            onClick={() => changeLanguage(item)}
          >
            {name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
