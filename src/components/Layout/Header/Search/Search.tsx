import { Button, Tooltip } from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import useTranslation from 'next-translate/useTranslation'
import { Search as SearchIcon } from 'tabler-icons-react'

import { useStyles } from '@/components/Layout/Header/Header.styles'

export default function Search() {
  const { classes } = useStyles()
  const { t } = useTranslation()

  return (
    <Tooltip label={t('common:Tooltip_search')} openDelay={500}>
      <Button
        variant='filled'
        color='gray'
        className={classes.button}
        onClick={openSpotlight}
      >
        <SearchIcon size={18} />
      </Button>
    </Tooltip>
  )
}
