import Link from '../Link'
import headerNavLinks from '@/data/headerNavLinks'
import { useState, useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { MotionButton } from '../Button'
import { MotionNav } from './Styles'
import { darkTheme } from '@/lib/stitches.config'
import { Flex } from '../Flex'
import { Box } from '../Box'

interface Props {
  navShow: boolean
  setNavShow: Dispatch<SetStateAction<boolean>>
}

export const MobileNav = ({ navShow, setNavShow }: Props) => {
  const onToggleNav = () => {
    setNavShow((status: boolean) => {
      if (status) {
        document.body.style.overflow = ''
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  // https://github.com/framer/motion/issues/578
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <MotionButton
        onClick={onToggleNav}
        css={{
          ml: '$1',
          height: '$11',
          width: '$11',
          p: 0,
          fontSize: '$lg',
          backgroundColor: 'transparent',
          color: '$honghong-colors-typeface-primary',
          '@sm': {
            ml: '$4',
          },
        }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.7,
          transition: { duration: 0.2 },
        }}
        aria-label="Toggle Navbar"
        type="button"
      >
        {navShow ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
      </MotionButton>
      {isLoaded && navShow && (
        <MotionNav
          animate={{ x: 0 }}
          initial={{ x: '100vw' }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          css={{
            visibility: 'visible',
            position: 'fixed',
            left: 0,
            right: 0,
            top: '60px',
            bottom: 0,
            zIndex: 50,
            display: 'block',
            height: '100%',
            width: '100%',
            maxWidth: '100vw',
            overflow: 'hidden',
            overflowY: 'scroll',
            backgroundColor: 'hsla($base-white, 100%)',
            px: '$6',
            pb: '$6',
            [`.${darkTheme} &`]: {
              backgroundColor: '$honghong-colors-body',
            },
            '@sm': {
              display: 'hidden',
            },
          }}
        >
          <Flex
            direction={'row'}
            css={{
              px: '$2',
              py: '$4',
              divideX: '1px',
            }}
          >
            <Box
              css={{
                width: '100%',
                ta: 'center',
                '& i': {
                  mr: '$1',
                },
              }}
            >
              <a href="https://github.com/tszhong0411" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github"></i>
                Github
              </a>
            </Box>
            <Box
              css={{
                width: '100%',
                ta: 'center',
                '& i': {
                  mr: '$1',
                },
              }}
            >
              <a
                href="https://instagram.com/tszhong0411/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
                Instagram
              </a>
            </Box>
          </Flex>
          {headerNavLinks.map((link) => (
            <Box
              key={link.title}
              css={{
                borderBottomWidth: '1px',
                borderColor: '$honghong-colors-border-primary',
                '& a': {
                  display: 'block',
                  py: '$4',
                  px: '$2',
                  transition: 'background-color 0.3s',
                  fontSize: '$base',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '$honghong-colors-typeface-primary',
                  '&:hover': {
                    backgroundColor: 'hsla($palette-gray-90, 5%)',
                    [`.${darkTheme} &`]: {
                      backgroundColor: 'hsla($palette-gray-98, 15%)',
                    },
                  },
                },
              }}
            >
              <Link href={link.href} onClick={onToggleNav}>
                {link.title}
              </Link>
            </Box>
          ))}
        </MotionNav>
      )}
    </>
  )
}
