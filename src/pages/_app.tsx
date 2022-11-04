import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { SpotlightProvider } from '@mantine/spotlight'
import { SpotlightAction } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { links } from '@/components/Layout/Header/links'
import Umami from '@/components/Umami'

import { GlobalStyles } from '@/GlobalStyles'

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
    const arr: Array<SpotlightAction> = []

    links.forEach((item) => {
      arr.push({
        title: item.text,
        onTrigger: () => router.push(item.href),
      })
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
            globalStyles: GlobalStyles,
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
                <Umami />
                <Component {...pageProps} />
              </SpotlightProvider>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}
