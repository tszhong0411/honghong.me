import { Kbd } from '@/components/ui/kbd'

const KbdDemo = () => {
  return (
    <div className='flex gap-4'>
      <Kbd>K</Kbd>
      <Kbd>⌘ ⇧ N</Kbd>
      <Kbd>⌥ ⌘ P</Kbd>
    </div>
  )
}

export default KbdDemo
