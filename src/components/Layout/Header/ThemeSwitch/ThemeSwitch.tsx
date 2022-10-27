import { Button, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { useStyles } from '../Header.styles'

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const { classes } = useStyles()
  const { t } = useTranslation('common')

  return (
    <Tooltip
      label={dark ? t('Tooltip.lightmode') : t('Tooltip.darkmode')}
      openDelay={500}
    >
      <Button
        variant='filled'
        color='gray'
        className={classes.button}
        onClick={() => toggleColorScheme()}
        aria-label={dark ? t('Tooltip.lightmode') : t('Tooltip.darkmode')}
      >
        {dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
      </Button>
    </Tooltip>
  )
}

export default ThemeSwitch
