import React from 'react';

import { ChildrenType } from '@/lib/types';

export default function PageTitle({ children }: ChildrenType) {
  return (
    <h1 className='mb-6 text-center text-4xl font-bold dark:text-primary-content'>
      {children}
    </h1>
  );
}
