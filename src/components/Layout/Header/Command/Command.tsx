import { Button, Tooltip } from '@mantine/core'
import { useSpotlight } from '@mantine/spotlight'
import { IconCommand } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation'

import { useStyles } from '../Header.styles'

const Command = () => {
  const { classes } = useStyles()
  const { t } = useTranslation('common')
  const { openSpotlight } = useSpotlight()

  return (
    <Tooltip label={t('Tooltip.search')} openDelay={500}>
      <Button
        variant='filled'
        color='gray'
        className={classes.button}
        onClick={openSpotlight}
        aria-label={t('Tooltip.search')}
      >
        <IconCommand size={24} />
      </Button>
    </Tooltip>
  )
}

export default Command
