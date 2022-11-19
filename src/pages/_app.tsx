import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { SpotlightProvider } from '@mantine/spotlight'
import { SpotlightAction } from '@mantine/spotlight'
import {
  IconBulb,
  IconCircleCheck,
  IconCode,
  IconHome,
  IconLink,
  IconMoonStars,
  IconPencil,
  IconSearch,
  IconSun,
  IconUser,
} from '@tabler/icons'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import Analytics from '@/components/Analytics/Analytics'

import { GlobalStyles } from '@/GlobalStyles'

const App = (props: AppProps & { colorScheme: ColorScheme }) => {
  const { Component, pageProps: {session, ...pageProps} } = props
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const { push } = useRouter()

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const actions: SpotlightAction[] = [
    {
      title: 'Copy URL',
      group: 'GENERAL',
      onTrigger: () => {
        navigator.clipboard.writeText(window.location.href)
        showNotification({
          title: 'Copied :)',
          message: 'You can now share it with anyone!',
          icon: <IconCircleCheck />,
          color: 'green',
        })
      },
      icon: <IconLink />,
    },
    {
      title: 'View Source',
      group: 'GENERAL',
      onTrigger: () =>
        window.open('https://github.com/tszhong0411/honghong.me', '_blank'),
      icon: <IconCode />,
    },
    {
      title: 'Home',
      group: 'GO TO',
      onTrigger: () => push('/'),
      icon: <IconHome />,
    },
    {
      title: 'Blog',
      group: 'GO TO',
      onTrigger: () => push('/blog'),
      icon: <IconPencil />,
    },
    {
      title: 'Projects',
      group: 'GO TO',
      onTrigger: () => push('/projects'),
      icon: <IconBulb />,
    },
    {
      title: 'About',
      group: 'GO TO',
      onTrigger: () => push('/about'),
      icon: <IconUser />,
    },
    {
      title: 'Toggle theme',
      group: 'SETTINGS',
      onTrigger: () => toggleColorScheme(),
      icon: colorScheme === 'dark' ? <IconSun /> : <IconMoonStars />,
    },
  ]

  return (
    <SessionProvider session={session}>
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
                actions={actions}
                radius='md'
                highlightQuery
              >
                <Analytics />
                <Component {...pageProps} />
              </SpotlightProvider>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}

export default App
