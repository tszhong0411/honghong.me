import React from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa';

import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { NavItem } from '@/components/Navbar/Navbar';
import { NavLinks } from '@/components/Navbar/NavLinks';

export default function DrawerSide() {
  return (
    <div className='drawer-side'>
      <label htmlFor='drawer' className='drawer-overlay'></label>
      <aside className='w-80 bg-base-100'>
        <div className='flex flex-row items-center justify-between px-4 py-4'>
          <div>
            <Link className='btn btn-ghost gap-2' href='/'>
              <Logo className='fill-primary-500' size={30} />
              <span className='block text-2xl'>小康</span>
            </Link>
          </div>
          <div>
            <Link
              href='https://github.com/TszHong0411'
              className='btn btn-ghost'
              noIcon={true}
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href='https://www.instagram.com/tszhong0411/'
              className='btn btn-ghost'
              noIcon={true}
            >
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
        <div className='divider m-0 px-8'></div>
        <ul className='menu w-80 overflow-y-auto p-4'>
          {NavLinks.map((item, index) => (
            <NavItem key={index} href={item.href} text={item.text} />
          ))}
        </ul>
      </aside>
    </div>
  );
}
