import React from 'react';

import { ChildrenType } from '@/lib/types';

export default function PageTitle({ children }: ChildrenType) {
  return <h1 className='mb-6 text-3xl font-bold md:text-5xl'>{children}</h1>;
}
