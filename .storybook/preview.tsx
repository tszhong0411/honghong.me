import { ColorSchemeProvider, Global, MantineProvider } from '@mantine/core'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import * as NextImage from 'next/image'
import { ImageProps } from 'next/image'
import I18nProvider from 'next-translate/I18nProvider'
import i18nConfig from '../i18n.json'

export const parameters = { layout: 'fullscreen' }

const namespaces = [...new Set(Object.values(i18nConfig.pages).flat())]

const translations = {}

i18nConfig.locales.forEach((locale) => {
  namespaces.forEach((ns) => {
    translations[locale] = {}
    translations[locale][ns] = {
      ...require(`../locales/${locale}/${ns}.json`),
    }
  })
})

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: i18nConfig.defaultLocale,
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: 'US', title: 'English' },
        { value: 'zh-TW', right: 'TW', title: '繁體中文' },
      ],
    },
  },
}

const ThemeWrapper = (props: any) => {
  const { children, locale } = props

  return (
    <I18nProvider lang={locale} namespaces={translations[locale]}>
      <ColorSchemeProvider colorScheme='light' toggleColorScheme={() => {}}>
        <MantineProvider
          theme={{
            colorScheme: useDarkMode() ? 'dark' : 'light',
            fontFamily:
              'Sora,Noto Sans TC,Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
            primaryColor: 'red',
            breakpoints: {
              xs: 375,
              sm: 640,
              md: 768,
              lg: 1024,
              xl: 1280,
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Noto+Sans+TC:wght@500;700&family=Fira+Code:wght@300;400;500;600;700&family=Sora:wght@100;200;300;400;500;600;700;800&display=swap'
            rel='stylesheet'
          />
          <Global
            styles={() => ({
              html: {
                scrollBehavior: 'smooth',
              },
              '::selection': {
                background: 'rgb(249, 6, 6, 0.05)',
                color: '#f90606',
              },
              '::-webkit-scrollbar': {
                width: 7,
                height: 5,
              },
              '::-webkit-scrollbar-thumb': {
                background: '#ef4444',
                transition: '0.25s',
                borderRadius: 2,
              },
              '::-webkit-scrollbar-track': {
                background: '0 0',
              },
              'input:-webkit-autofill, input:-webkit-autofill:focus': {
                transition: 'background-color 600000s 0s, color 600000s 0s',
              },
            })}
          />
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </I18nProvider>
  )
}

export const decorators = [
  (Story: any, { globals }) => (
    <ThemeWrapper {...globals}>
      <Story />
    </ThemeWrapper>
  ),
]

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: ImageProps) => <OriginalNextImage {...props} unoptimized />,
})
