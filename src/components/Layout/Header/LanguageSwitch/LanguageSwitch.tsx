import { Button, Image, Menu, Tooltip } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconChevronDown, IconLanguage } from '@tabler/icons'
import { default as emojiUnicode } from 'emoji-unicode'
import { useRouter } from 'next/router'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { useStyles } from '@/components/Layout/Header/Header.styles'

export default function LanguageSwitch() {
  const router = useRouter()
  const [locale, setLocale] = useLocalStorage({ key: 'locale' })
  const { t } = useTranslation('common')
  const { classes } = useStyles()

  React.useEffect(() => {
    const redirect = async () => {
      await setLanguage(locale)
    }

    if (locale) {
      if (locale !== router.locale) {
        redirect()
      }
    }
  }, [locale, router])

  const changeLanguage = async (locale: string) => {
    setLocale(locale)
    await setLanguage(locale)
  }

  const languages = {
    'zh-TW': {
      name: '繁體中文',
      flag: '🇹🇼',
    },
    en: {
      name: 'English',
      flag: '🇬🇧',
    },
  }

  return (
    <Menu width={200} position='bottom-end'>
      <Tooltip label={t('Tooltip.switchLanguage')} openDelay={500}>
        <span>
          <Menu.Target>
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
              aria-label={t('Tooltip.switchLanguage')}
            >
              <IconLanguage size={20} />
              <IconChevronDown size={15} />
            </Button>
          </Menu.Target>
        </span>
      </Tooltip>

      <Menu.Dropdown>
        <Menu.Label>{t('language')}</Menu.Label>
        {router.locales.map((item: string, index: number) => {
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
      </Menu.Dropdown>
    </Menu>
  )
}
