import { Box, useMantineTheme } from '@mantine/core';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { CloudinaryImg } from '@/components/Image';
import Kbd from '@/components/Kbd';
import CustomLink from '@/components/Link';
import Pre from '@/components/Pre';
import Table from '@/components/Table';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';

const MDXComponents = {
  CloudinaryImg,
  YouTubeEmbed,
  Kbd,
  Pre,
  a: CustomLink,
  table: Table,
};

export default MDXComponents;

export const MDXComponent = ({ code }) => {
  const Component = useMDXComponent(code);
  const { colorScheme } = useMantineTheme();
  const dark = colorScheme === 'dark';

  return (
    <Box
      sx={(theme) => ({
        '& :is(ol, ul)': {
          listStyleType: 'disc',
          paddingLeft: '1.625em',
        },
        '& li': {
          paddingLeft: 6,
          margin: '8px 0',
          [theme.fn.largerThan('xl')]: {
            paddingLeft: 8,
            margin: '12px 0',
          },
        },
        '& ul > li::marker': {
          color: 'rgba(166, 173, 186, 0.5)',
        },
        '& a': {
          color: dark ? theme.colors.red[8] : theme.colors.red[5],
          fontSize: 'unset',
          lineHeight: 'unset',
        },
        '& p': {
          color: dark ? '#98a0b3' : '#626b84',
          fontSize: 16,
          marginTop: 20,
          marginBottom: 20,
          [theme.fn.largerThan('lg')]: {
            fontSize: 20,
          },
        },
        '& figure': {
          margin: '32px 0',
          [theme.fn.largerThan('lg')]: {
            margin: '40px 0',
          },
        },
        '& :is(h2+*)': {
          marginTop: 0,
        },
        '& h2': {
          fontWeight: 700,
          color: dark ? '#e8e8fd' : '#04052f',
          letterSpacing: 0,
          fontSize: 24,
          marginTop: '2em',
          marginBottom: '1em',
          lineHeight: 1.3333333,
          [theme.fn.largerThan('lg')]: {
            marginTop: '1.5555556em',
            marginBottom: '0.8888889em',
            fontSize: 36,
            lineHeight: 1.1111111,
          },
        },
        '& h3': {
          fontWeight: 700,
          lineHeight: 1.6818,
          color: dark ? '#e8e8fd' : '#04052f',
          letterSpacing: 0,
          fontSize: 20,
          margin: '2em 0 23.2px 0',
        },
        '& p code': {
          color: '#e3371e',
          backgroundColor: dark ? '#2a0000' : '#ef44441a',
          fontFamily: 'Fira Code,Noto Sans TC,Inter',
          fontWeight: 600,
          fontSize: 14,
          border: dark ? '1px solid #5f0000' : '1px solid #eee',
          borderRadius: 30.4,
          padding: '2px 8px',
        },
        '& .anchor': {
          visibility: 'hidden',
          position: 'absolute',
          textDecorationLine: 'none',
          marginLeft: '-1em',
          paddingRight: '0.5em',
          width: '80%',
          maxWidth: '896px',
          cursor: 'pointer',
        },
        '& .anchor:hover': {
          visibility: 'visible',
        },
        '& .anchor:after': {
          color: dark ? '#404040' : '#d4d4d4',
          content: '"#"',
        },
        '& :is(h2, h3)': {
          position: 'relative',
          scrollMarginTop: 128,

          '&:hover .anchor': {
            visibility: 'visible',
          },
        },
        '& pre': {
          fontFamily: 'Fira Code,Noto Sans TC,Inter',
          fontSize: 16,
          [theme.fn.largerThan('lg')]: {
            fontSize: 18,
          },
        },
      })}
    >
      <Component components={MDXComponents} />
    </Box>
  );
};
