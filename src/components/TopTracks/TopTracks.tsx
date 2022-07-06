import { useMantineColorScheme } from '@mantine/core';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import { TopTracks } from '@/components/TopTracks/types';
import Track from '@/components/Track';

const ContentLoader = () => {
  return (
    <>
      <div className='flex gap-x-2'>
        <Skeleton width={20} height={20} />
        <Skeleton width={122} height={20} />
      </div>
      <Skeleton
        width={210}
        height={20}
        style={{ marginLeft: 'calc(20px+0.5rem)' }}
      />
    </>
  );
};

export default function Tracks() {
  const { data } = useSWR<TopTracks>('/api/top-tracks', fetcher);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  if (!data) {
    return (
      <SkeletonTheme
        baseColor={dark ? '#202020' : '#d9d9d9'}
        highlightColor={dark ? '#444444' : '#ecebeb'}
      >
        <div className='flex flex-col gap-y-4'>
          <ContentLoader />
          <ContentLoader />
          <ContentLoader />
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className='py-4'>
      {data.tracks.map((track, index) => (
        <React.Fragment key={index}>
          <Track ranking={index + 1} {...track} />
          {index !== data.tracks.length - 1 && (
            <div className='divider m-0'></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
