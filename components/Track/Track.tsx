import Link from '@/components/Link'

export default function Track(track) {
  return (
    <div className="mt-3 flex w-full max-w-3xl flex-row items-baseline">
      <p className="text-sm font-bold text-typeface-secondary dark:text-typeface-secondary-dark">
        {track.ranking}
      </p>
      <div className="flex flex-col pl-3 pt-3">
        <Link href={track.songUrl}>{track.title}</Link>
        <p className="mb-4 w-60 text-sm text-typeface-secondary dark:text-typeface-primary-dark sm:w-96 md:w-full">
          {track.artist}
        </p>
      </div>
    </div>
  )
}
