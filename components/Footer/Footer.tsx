import NowPlaying from '../NowPlaying'
import Link from '../Link'
import footerNavLinks from '@/data/footerNavLinks'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { StyledFooter } from './Styles'
import { Flex } from '../Flex'
import { Grid } from '../Grid'
import { Box } from '../Box'

export default function Footer() {
  const { locale, defaultLocale } = useRouter()
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      <StyledFooter>
        <Flex
          css={{
            mx: 'auto',
            mt: '$5',
            pt: '$8',
            borderTopWidth: '1px',
            borderColor: '$honghong-colors-border-primary',
          }}
          wrap={'wrap'}
        >
          <NowPlaying />
          <Grid
            columns={2}
            gap={4}
            css={{
              width: '100%',
              pb: '$10',
              '@sm': {
                gridTemplateColumns: 'repeat(3, 1fr)',
              },
            }}
          >
            {footerNavLinks.middleLinks.map((item, index) => {
              return (
                <Flex
                  key={index}
                  direction={'column'}
                  css={{
                    mb: '$7',
                    pr: '$4',
                  }}
                  alignItems={'flex-start'}
                  gap={4}
                >
                  {item.list.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        variant="red"
                        css={{
                          transitionDuration: '0s',
                        }}
                        underline
                        href={
                          item.href === '/feed.xml'
                            ? `/feed${locale === defaultLocale ? '' : `.${locale}`}.xml`
                            : item.href
                        }
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </Flex>
              )
            })}
          </Grid>
        </Flex>
        <Box css={{ mx: 'auto', width: '100%', mb: '$6', fontWeight: 600 }}>
          © {new Date().getFullYear()}
          {' 小康'}
        </Box>
      </StyledFooter>
    </>
  )
}
