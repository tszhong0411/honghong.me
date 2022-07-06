import React from 'react';

import { useModal } from '@/lib/store';
import { ChildrenType } from '@/lib/types';

import Footer from '@/components/Layout/Footer';
import Modal from '@/components/Modal';
import { Navbar } from '@/components/Navbar';

export default function DrawerContent({ children }: ChildrenType) {
  const { status } = useModal();

  return (
    <>
      <div className='drawer-content flex flex-col scroll-smooth'>
        <Navbar />
        <main className='mx-auto w-full max-w-5xl py-12 px-4 lg:px-10 xl:px-4 xs:px-8'>
          {children}
        </main>
        <Footer />
      </div>
      {status && <Modal />}
    </>
  );
}
