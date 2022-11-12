import { Anchor, Box, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'

import { isProduction } from '@/lib/constants'

import { links } from '@/components/Layout/Footer/links'
import Link from '@/components/Link'
import NowPlaying from '@/components/NowPlaying'

import { useStyles } from './Footer.styles'

const Footer = () => {
  const { locale, defaultLocale } = useRouter()
  const { classes } = useStyles()
  const { colorScheme } = useMantineTheme()
  const dark = colorScheme === 'dark'

  return (
    <footer className={classes.footer}>
      <div className={classes.footerInner}>
        {isProduction && <NowPlaying />}
        <Box
          pb={64}
          sx={(theme) => ({
            display: 'grid',
            gap: 16,
            width: '100%',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            [theme.fn.largerThan('sm')]: {
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            },
          })}
        >
          {links.middleLinks.map(({ list }, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 16,
                  marginBottom: 40,
                  paddingRight: 16,
                }}
              >
                {list.map(({ href, title }, index) => {
                  if (href === '/feed.xml') {
                    return (
                      <Anchor
                        key={index}
                        href={`/feed${
                          locale === defaultLocale ? '' : `.${locale}`
                        }.xml`}
                        sx={{
                          color: dark ? '#C1C2C5' : '#1f2937',
                          ...(dark && {
                            '&:hover': {
                              color: 'white',
                            },
                          }),
                        }}
                      >
                        {title}
                      </Anchor>
                    )
                  }

                  return (
                    <Link
                      key={index}
                      href={href}
                      sx={{
                        color: dark ? '#C1C2C5' : '#1f2937',
                        ...(dark && {
                          '&:hover': {
                            color: 'white',
                          },
                        }),
                      }}
                    >
                      {title}
                    </Link>
                  )
                })}
              </Box>
            )
          })}
        </Box>
      </div>
      <div className={classes.footerBottom}>
        © {new Date().getFullYear()}
        {' 小康'}
      </div>
    </footer>
  )
}

export default Footer
