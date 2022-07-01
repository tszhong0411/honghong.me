import React from 'react';

import { ChildrenType } from '@/lib/types';

export default function Kbd({ children }: ChildrenType) {
  return <kbd className='kbd kbd-md'>{children}</kbd>;
}
