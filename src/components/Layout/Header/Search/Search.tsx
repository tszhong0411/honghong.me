import { Button, Tooltip } from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation'

import { useStyles } from '@/components/Layout/Header/Header.styles'

export default function Search() {
  const { classes } = useStyles()
  const { t } = useTranslation('common')

  return (
    <Tooltip label={t('Tooltip.search')} openDelay={500}>
      <Button
        variant='filled'
        color='gray'
        className={classes.button}
        onClick={openSpotlight}
        aria-label={t('Tooltip.search')}
      >
        <IconSearch size={18} />
      </Button>
    </Tooltip>
  )
}
