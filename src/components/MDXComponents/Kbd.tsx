import { WithChildren } from '@/types'

type KbdProps = WithChildren

const Kbd = (props: KbdProps) => {
  const { children } = props

  return (
    <kbd className='break-words rounded-md border border-white/10 border-opacity-[0.04] bg-white/10 bg-opacity-[0.03] px-[.25em] py-0.5 text-[.9em]'>
      {children}
    </kbd>
  )
}

export default Kbd
