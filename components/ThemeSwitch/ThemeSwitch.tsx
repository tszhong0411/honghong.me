import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MotionButton } from '../Button/Button'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <MotionButton
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
        rotate: 360,
        transition: { duration: 0.2 },
      }}
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <i className="fa-solid fa-sun"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </MotionButton>
  )
}

export default ThemeSwitch
