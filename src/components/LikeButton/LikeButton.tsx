import { ActionIcon, Center, Group, Skeleton, Text } from '@mantine/core'
import { motion } from 'framer-motion'

import { usePostLikes } from '@/hooks/usePostLikes'

import { useStyles } from './LikeButton.styles'

type LikeButtonProps = {
  slug: string
}

const emojis = ['❤️', '😘', '🥰']

export default function LikeButton({ slug }: LikeButtonProps) {
  const { currentUserLikes, likes, isLoading, increment } = usePostLikes(slug)
  const { classes } = useStyles()

  return (
    <Center mt={40}>
      <Group noWrap>
        <ActionIcon
          size='xl'
          variant='transparent'
          onClick={() => {
            if (isLoading) return
            increment()
          }}
          sx={{
            position: 'relative',
          }}
        >
          <div className={classes.emojiWrapper}>
            {emojis.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  className={classes.emoji}
                  animate={currentUserLikes === index + 1 ? 'show' : 'hide'}
                  variants={{
                    hide: { translateY: -80, opacity: 0 },
                    show: {
                      translateY: [0, -40, -60],
                      opacity: [0, 1, 0],
                    },
                  }}
                  initial='hide'
                >
                  {item}
                </motion.div>
              )
            })}
          </div>
          <svg viewBox='0 0 20 20' style={{ width: 96 }}>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='20%' className={classes.firstStop}></stop>
                <stop offset='80%' className={classes.secondStop}></stop>
              </linearGradient>
              <mask id='mask' mask-type='alpha' maskUnits='userSpaceOnUse'>
                <path d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'></path>
              </mask>
            </defs>
            <g mask='url(#mask)'>
              <rect width='20' height='20' className={classes.heart}></rect>
              <motion.rect
                fill='url(#gradient)'
                width='16'
                height='16'
                x='2'
                y='2'
                animate={String(currentUserLikes)}
                variants={{
                  '0': { translateY: 17 },
                  '1': { translateY: 12 },
                  '2': { translateY: 8 },
                  '3': { translateY: 1 },
                }}
                initial='0'
              ></motion.rect>
            </g>
          </svg>
        </ActionIcon>
        {!isLoading ? (
          <Text size={22} weight={700}>
            {likes}
          </Text>
        ) : (
          <Skeleton width={50} />
        )}
      </Group>
    </Center>
  )
}
