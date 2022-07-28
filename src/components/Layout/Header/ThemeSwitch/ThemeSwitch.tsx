import { Button, Tooltip, useMantineColorScheme } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { MoonStars, Sun } from 'tabler-icons-react'

import { useStyles } from '@/components/Layout/Header/Header.styles'

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const { classes } = useStyles()
  const { t } = useTranslation()

  return (
    <Tooltip
      label={
        dark ? t('common:Tooltip_lightmode') : t('common:Tooltip_darkmode')
      }
      openDelay={500}
    >
      <Button
        variant='filled'
        color='gray'
        className={classes.button}
        onClick={() => toggleColorScheme()}
        aria-label={
          dark ? t('common:Tooltip_lightmode') : t('common:Tooltip_darkmode')
        }
      >
        {dark ? <Sun size={20} /> : <MoonStars size={20} />}
      </Button>
    </Tooltip>
  )
}

export default ThemeSwitch
