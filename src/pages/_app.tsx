import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { SpotlightProvider } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'

import '@/styles/global.css'
import '@/styles/prism.css'

import { isProd } from '@/lib/isProduction'

import { links } from '@/components/Layout/Header/links'
import Umami from '@/components/Umami'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const router = useRouter()

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const Actions = () => {
    const arr = []

    links.forEach((item) => {
      const obj = {}

      obj['title'] = item.text
      obj['onTrigger'] = () => router.push(item.href)

      arr.push(obj)
    })

    return arr
  }

  return (
    <SessionProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
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
        >
          <ModalsProvider>
            <NotificationsProvider>
              <SpotlightProvider
                searchIcon={<IconSearch size={18} />}
                searchPlaceholder='Search'
                shortcut={['mod + k', 'mod + p']}
                nothingFoundMessage='Nothing found'
                actions={Actions()}
                radius='md'
                highlightQuery
              >
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
                      transition:
                        'background-color 600000s 0s, color 600000s 0s',
                    },
                  })}
                />
                {isProd && <Umami />}
                <Component {...pageProps} />
              </SpotlightProvider>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}
