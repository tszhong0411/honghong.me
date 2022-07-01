import React from 'react';

import { ChildrenType } from '@/lib/types';

import DrawerContent from '@/components/Drawer/DrawerContent';
import DrawerSide from '@/components/Drawer/DrawerSide';

export default function Drawer({ children }: ChildrenType) {
  return (
    <div className='drawer bg-base-100'>
      <input id='drawer' type='checkbox' className='drawer-toggle' />
      <DrawerContent>{children}</DrawerContent>
      <DrawerSide />
    </div>
  );
}
