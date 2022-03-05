import { darkTheme } from '@/lib/stitches.config'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Box, MotionDiv } from '../Box'
import { MotionButton } from '../Button'

export default function LanguageSwitch({ open, setOpen }) {
  const router = useRouter()

  const changeLanguage = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale })
  }

  // https://github.com/framer/motion/issues/578
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <MotionButton
        aria-label="Switch language"
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.7,
          transition: { duration: 0.2 },
        }}
        onClick={() => {
          !open ? setOpen(true) : setOpen(false)
        }}
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
      >
        <i className="fa-solid fa-globe"></i>
      </MotionButton>
      {isLoaded && (
        <AnimatePresence>
          {open && (
            <MotionDiv
              animate={{ y: 0 }}
              initial={{ y: -200 }}
              exit={{ y: -200, opacity: 0 }}
              css={{
                position: 'fixed',
                top: 'calc($10 - 4px)',
                right: 0,
                zIndex: 50,
                display: 'flex',
                flexDirection: 'row',
                gapX: '$4',
                borderRadius: '$2',
                borderColor: '$honghong-colors-border-primary',
                backgroundColor: '$honghong-colors-body-secondary',
                borderWidth: '$2',
                py: '$2',
                px: '$4',
                '@sm': {
                  top: '$10',
                },
                '@md': {
                  position: 'absolute',
                  top: '$10',
                },
              }}
            >
              <Box
                css={{
                  cursor: 'pointer',
                  borderRadius: '$2',
                  px: '$4',
                  py: '$2',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: 'hsla($palette-gray-10, 100%)',
                    [`.${darkTheme} &`]: {
                      backgroundColor: 'hsla($palette-gray-90, 100%)',
                    },
                  },
                }}
                onClick={() => {
                  setOpen(false)
                  changeLanguage('zh-TW')
                }}
                aria-hidden="true"
              >
                繁體中文
              </Box>
              <Box
                css={{
                  cursor: 'pointer',
                  borderRadius: '$2',
                  px: '$4',
                  py: '$2',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: 'hsla($palette-gray-10, 100%)',
                    [`.${darkTheme} &`]: {
                      backgroundColor: 'hsla($palette-gray-90, 100%)',
                    },
                  },
                }}
                onClick={() => {
                  setOpen(false)
                  changeLanguage('en')
                }}
                aria-hidden="true"
              >
                English
              </Box>
            </MotionDiv>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
