import { Kbd } from '@mantine/core'
import React from 'react'

import { ChildrenType } from '@/lib/types'

export default function CustomKbd({ children }: ChildrenType) {
  return <Kbd>{children}</Kbd>
}
