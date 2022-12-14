import { WithChildren } from '@/types'

type KbdProps = WithChildren

const Kbd = (props: KbdProps) => {
  const { children } = props

  return (
    <kbd className='break-words rounded-md border border-black border-opacity-[0.04] bg-black bg-opacity-[0.03] py-0.5 px-[.25em] text-[.9em] dark:border-white/10 dark:bg-white/10  '>
      {children}
    </kbd>
  )
}

export default Kbd
