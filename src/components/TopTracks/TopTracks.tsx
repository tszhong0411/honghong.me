import { Box, Divider, Skeleton } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import { TopTracks } from '@/components/TopTracks/types';
import Track from '@/components/Track';

export default function Tracks() {
  const { data } = useSWR<TopTracks>('/api/top-tracks', fetcher);

  if (!data) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <Skeleton height={16} radius='xl' />
        <Skeleton height={16} radius='xl' width='70%' />
      </Box>
    );
  }

  return (
    <Box py={24}>
      {data.tracks.map((track, index) => (
        <React.Fragment key={index}>
          <Track ranking={index + 1} {...track} />
          {index !== data.tracks.length - 1 && <Divider my={8} />}
        </React.Fragment>
      ))}
    </Box>
  );
}
