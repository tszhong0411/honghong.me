import Image from 'next/image'
import Link from '@/components/Link'
import { motion } from 'framer-motion'
import { Flex } from '../Flex'
import { Text } from '../Text'
import List from '../List'
import { Box } from '../Box'
import { Logo } from './Styles'

export default function Hero() {
  return (
    <>
      <Flex
        justifyContent={'between'}
        alignItems={'center'}
        css={{
          maxWidth: '$max-w-3xl',
          mx: 'auto',
          mt: '$8',
          mb: '$12',
        }}
      >
        <div>
          <Text
            size={'10'}
            css={{
              fontWeight: 700,
              pb: '$5',
              fontSize: '$3xl',
              '@sm': {
                fontSize: '$6xl',
              },
            }}
          >
            小康
          </Text>
          <Text size={'3'} as="p">
            A teenager who loves web development
          </Text>
          <div>
            <List
              css={{
                display: 'flex',
                gapX: '$2',
                fontSize: '$sm',
                color: '$honghong-colors-typeface-secondary',
              }}
            >
              <li>#react</li>
              <li>#next.js</li>
              <li>#tailwind</li>
            </List>
          </div>
          <Box css={{ mt: '$6' }}>
            <Flex
              css={{
                gapX: '$4',
                gapY: '$3',
                '@sm': {
                  flexDirection: 'row',
                },
                '& i': {
                  mr: '$1',
                },
              }}
              direction={'column'}
              inlineFlex
            >
              <Link href="https://instagram.com/tszhong0411/" underline variant={'red'}>
                <i className="fa-brands fa-instagram "></i>
                Instagram
              </Link>
              <Link href="https://github.com/tszhong0411" underline variant={'red'}>
                <i className="fa-brands fa-github"></i>
                Github
              </Link>
              <Link href="https://honghong.me/youtube" underline variant={'red'}>
                <i className="fa-brands fa-youtube"></i>
                Youtube
              </Link>
            </Flex>
          </Box>
        </div>
        <Box css={{ display: 'none', '@sm': { display: 'block' } }}>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            style={{ height: '130px', width: '130px', position: 'relative' }}
          >
            <Image
              src="/static/images/avatar.png"
              alt="Avatar"
              layout="fill"
              objectFit="contain"
              className={Logo()}
            />
          </motion.div>
        </Box>
      </Flex>
    </>
  )
}
