import React from 'react';
import { MdMenu } from 'react-icons/md';

import LanguageSwitch from '@/components/LanguageSwitch';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { NavLinks } from '@/components/Navbar/NavLinks';
import ThemeSwitch from '@/components/ThemeSwitch';

export const NavItem = ({ href, text }) => (
  <li>
    <Link href={href}>{text}</Link>
  </li>
);

export const Navbar = () => {
  return (
    <>
      <div className='navbar sticky top-0 z-50 mx-auto max-w-5xl bg-base-100'>
        <div className='flex-1'>
          <div className='flex-none lg:hidden'>
            <label htmlFor='drawer' className='btn btn-ghost btn-square'>
              <MdMenu size={30} />
            </label>
          </div>
          <Link href='/' className='btn btn-ghost hidden sm:flex'>
            <Logo className='mx-4 fill-primary-600' size={30} />
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal hidden gap-2 p-0 lg:flex'>
            {NavLinks.map((item, index) => (
              <NavItem key={index} href={item.href} text={item.text} />
            ))}
          </ul>
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
      </div>
    </>
  );
};
