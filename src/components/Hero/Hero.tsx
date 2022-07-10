// eslint-disable-next-line simple-import-sort/imports
import { motion } from 'framer-motion';
import Image from 'next/image';

import Link from '@/components/Link';
import useStyles from './Hero.styles';
import { Badge, Group, Text, Title, useMantineTheme } from '@mantine/core';

export default function Hero() {
  const { classes } = useStyles();
  const { colorScheme } = useMantineTheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <div className={classes.hero}>
        <div>
          <Title order={1} sx={{ margin: '0 0 24px 0' }}>
            小康
          </Title>
          <Text>A teenager who loves web development</Text>
          <Group spacing='sm' sx={{ margin: '8px 0' }}>
            <Badge variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
              # react
            </Badge>
            <Badge
              variant='gradient'
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            >
              # Next.js
            </Badge>
            <Badge variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
              # tailwind
            </Badge>
          </Group>
          <div>
            <Group
              align='flex-start'
              spacing='sm'
              mt={36}
              sx={() => ({
                flexDirection: 'column',
                '& > a': {
                  color: dark ? 'white' : 'black',
                },
              })}
            >
              <Link href='https://instagram.com/tszhong0411/'>Instagram</Link>
              <Link href='https://github.com/tszhong0411'>Github</Link>
              <Link href='https://honghong.me/youtube'>Youtube</Link>
            </Group>
          </div>
        </div>
        <div className={classes.logoWrapper}>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            style={{ height: 130, width: 130, position: 'relative' }}
          >
            <Image
              src='/static/images/logo/logo-black.png'
              alt='Logo'
              layout='fill'
              objectFit='contain'
              className={classes.logo}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
