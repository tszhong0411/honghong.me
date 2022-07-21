import { Burger, Group, Paper, Transition } from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { useRouter } from 'next/router'
import React from 'react'

import HeaderLogo from '@/components/Layout/Header/HeaderLogo'
import LanguageSwitch from '@/components/Layout/Header/LanguageSwitch'
import { links } from '@/components/Layout/Header/links'
import Search from '@/components/Layout/Header/Search'
import ThemeSwitch from '@/components/Layout/Header/ThemeSwitch'
import Link from '@/components/Link'

import { useStyles } from './Header.styles'

export default function Header() {
  const { classes, cx } = useStyles()
  const [opened, toggleOpened] = useBooleanToggle(false)
  const { locale, defaultLocale, asPath } = useRouter()

  const items = links.map((link) => (
    <Link
      key={link.text}
      href={
        link.href === '/feed.xml'
          ? `/feed${locale === defaultLocale ? '' : `.${locale}`}.xml`
          : link.href
      }
      className={cx(classes.link, {
        [classes.linkActive]: asPath === link.href,
      })}
      onClick={() => {
        toggleOpened(false)
      }}
    >
      {link.text}
    </Link>
  ))

  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <Burger
          opened={opened}
          className={classes.burger}
          size='sm'
          onClick={() => toggleOpened()}
          aria-label='Toggle navbar'
        />
        <HeaderLogo />
        <Transition transition='slide-right' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </div>
      <div className={classes.headerRight}>
        <Group spacing={5} className={classes.links}>
          {items.slice(0, 4)}
        </Group>
        <Search />
        <ThemeSwitch />
        <LanguageSwitch />
      </div>
    </div>
  )
}
