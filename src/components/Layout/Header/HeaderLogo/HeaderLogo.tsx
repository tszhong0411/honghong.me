import Link from 'next/link'

import HeaderLogoImage from '@/components/Layout/Header/HeaderLogo/HeaderLogoImage'

import { useStyles } from './HeaderLogo.styles'

export default function HeaderLogo() {
  const { classes } = useStyles()

  return (
    <Link href='/'>
      <a className={classes.logoWrapper}>
        <HeaderLogoImage className={classes.logo} />
      </a>
    </Link>
  )
}
