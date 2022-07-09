import { Box, Divider, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';

import { isProd } from '@/lib/isProduction';

import { FooterLinks } from '@/components/Layout/Footer/FooterLinks';
import Link from '@/components/Link';
import NowPlaying from '@/components/NowPlaying';

import useStyles from './Footer.styles';

export default function Footer() {
  const { locale, defaultLocale } = useRouter();
  const { classes } = useStyles();
  const { colorScheme } = useMantineTheme();
  const dark = colorScheme === 'dark';

  return (
    <footer className={classes.footer}>
      <Divider my='xl' />
      <div className={classes.footerInner}>
        {isProd && <NowPlaying />}
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
          {FooterLinks.middleLinks.map((item, index) => {
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
                {item.list.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={
                        item.href === '/feed.xml'
                          ? `/feed${
                              locale === defaultLocale ? '' : `.${locale}`
                            }.xml`
                          : item.href
                      }
                      sx={{
                        color: dark ? '#C1C2C5' : '#1f2937',
                        ...(dark && {
                          '&:hover': {
                            color: 'white',
                          },
                        }),
                      }}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </div>
      <div className={classes.footerBottom}>
        © {new Date().getFullYear()}
        {' 小康'}
      </div>
    </footer>
  );
}
