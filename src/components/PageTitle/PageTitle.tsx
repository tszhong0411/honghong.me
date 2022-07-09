import { Title, useMantineTheme } from '@mantine/core';
import React from 'react';

import { ChildrenType } from '@/lib/types';

export default function PageTitle({ children }: ChildrenType) {
  const { colorScheme } = useMantineTheme();
  const dark = colorScheme === 'dark';

  return (
    <Title
      order={1}
      mb={24}
      sx={{
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 700,
        color: dark ? 'white' : 'black',
      }}
    >
      {children}
    </Title>
  );
}
