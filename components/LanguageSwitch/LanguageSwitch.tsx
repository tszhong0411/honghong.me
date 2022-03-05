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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '$lg',
          backgroundColor: 'transparent',
          color: '$honghong-colors-typeface-primary',
          '@sm': {
            ml: '$4',
          },
        }}
      >
        <Box
          as="svg"
          css={{
            fill: '$honghong-colors-typeface-primary',
            transition: '0.3s',
          }}
          xmlns="http://www.w3.org/2000/svg"
          height={20}
          width={20}
          viewBox="0 0 512 512"
        >
          <path d="M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z" />
        </Box>
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
