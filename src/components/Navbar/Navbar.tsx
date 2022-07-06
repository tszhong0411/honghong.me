import { Header, useMantineColorScheme } from '@mantine/core';
import React from 'react';

import ThemeSwitch from '@/components/Layout/Header/ThemeSwitch';
import Link from '@/components/Link';

export const NavItem = ({ href, text }) => (
  <li>
    <Link href={href}>{text}</Link>
  </li>
);

export const Navbar = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <Header height={60}>
        <div></div>
        <div></div>
        <div>
          <ThemeSwitch />
        </div>
      </Header>
    </>
  );
  // return (
  //   <>
  //     <div className="navbar sticky top-0 z-50 mx-auto max-w-5xl bg-base-100">
  //       <div className="flex-1">
  //         <div className="flex-none lg:hidden">
  //           <label htmlFor="drawer" className="btn btn-ghost btn-square">
  //             <Menu size={30} />
  //           </label>
  //         </div>
  //         <Link href="/" className="btn btn-ghost hidden sm:flex">
  //           <Logo className="mx-4 fill-primary-600" size={30} />
  //         </Link>
  //       </div>
  //       <div className="flex-none">
  //         <ul className="menu menu-horizontal hidden gap-2 p-0 lg:flex">
  //           {NavLinks.map((item, index) => (
  //             <NavItem key={index} href={item.href} text={item.text} />
  //           ))}
  //         </ul>
  //         <ThemeSwitch />
  //         <LanguageSwitch />
  //       </div>
  //     </div>
  //   </>
  // );
};
