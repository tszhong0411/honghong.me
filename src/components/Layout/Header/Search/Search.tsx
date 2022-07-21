import { Button, Tooltip } from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import { Search as SearchIcon } from 'tabler-icons-react'

import { useStyles } from '@/components/Layout/Header/Header.styles'

export default function Search() {
  const { classes } = useStyles()

  return (
    <Tooltip label='Search' openDelay={500}>
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
