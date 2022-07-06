import { Burger } from '@mantine/core';

import HeaderLogo from '@/components/Layout/Header/HeaderLogo';
import LanguageSwitch from '@/components/Layout/Header/LanguageSwitch';
import ThemeSwitch from '@/components/Layout/Header/ThemeSwitch';
import { HeaderProps } from '@/components/Layout/Header/types';

import useStyles from './Header.styles';

export default function Header({ navbarOpened, toggleNavbar }: HeaderProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <Burger
          opened={navbarOpened}
          className={classes.burger}
          size='sm'
          onClick={toggleNavbar}
          aria-label='Toggle navbar'
        />
        <HeaderLogo />
      </div>
      <div className={classes.headerRight}>
        <LanguageSwitch />
        <ThemeSwitch />
      </div>
    </div>
  );
}
