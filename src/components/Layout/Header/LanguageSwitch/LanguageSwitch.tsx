import { Button, Image, Menu, Tooltip } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { default as emojiUnicode } from 'emoji-unicode'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { ChevronDown, Language } from 'tabler-icons-react'

import i18nConfig from '@/lib/i18n'

import { useStyles } from '@/components/Layout/Header/Header.styles'

export default function LanguageSwitch() {
  const router = useRouter()
  const [locale, setLocale] = useLocalStorage({ key: 'locale' })
  const { locales, languages, defaultLocale } = i18nConfig
  const { t } = useTranslation()
  const { classes } = useStyles()

  // Redirect router when locale not set in 'localstorage'
  React.useEffect(() => {
    if (typeof locale === 'string' && locale !== router.locale) {
      locale !== defaultLocale &&
        router.push(router.asPath, router.asPath, { locale })
    }
  }, [defaultLocale, locale, locales, router])

  const changeLanguage = (locale: string) => {
    setLocale(locale)
    router.push(router.asPath, router.asPath, { locale })
  }

  return (
    <Menu
      control={
        <Tooltip label='Switch language' openDelay={500}>
          <Button
            variant='filled'
            color='gray'
            className={classes.button}
            sx={{
              width: 66,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Language size={20} />
            <ChevronDown size={15} />
          </Button>
        </Tooltip>
      }
    >
      <Menu.Label>{t('common:language')}</Menu.Label>
      {locales.map((item: string, index: number) => {
        const name = languages[item].name,
          flag = languages[item].flag

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
        )
      })}
    </Menu>
  )
}
