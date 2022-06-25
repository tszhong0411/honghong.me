import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import { NowPlayingSong } from '@/lib/types';

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher);
  return (
    <>
      <div className='mb-8 flex w-full flex-row-reverse flex-nowrap items-center gap-x-1 space-x-0 sm:flex-row sm:space-x-2'>
        <div className='flex h-6 w-5 items-center'>
          <FaSpotify fill='#1ed760' size={20} />
        </div>
        <div className='inline-flex w-full max-w-full flex-col gap-1 text-xs sm:flex-row'>
          <p className='text-xs'>
            {data?.isPlaying ? (
              <Link href={data.songUrl}>
                <a>{data.title}</a>
              </Link>
            ) : (
              'Not Listening'
            )}
          </p>
          <span className='mx-2 hidden text-xs text-typeface-teriary dark:text-typeface-teriary-dark sm:block'>
            {' - '}
          </span>
          <p className='text-xs text-typeface-teriary dark:text-typeface-teriary-dark'>
            {data?.isPlaying ? data.artist : 'Spotify'}
          </p>
        </div>
      </div>
    </>
  );
}
