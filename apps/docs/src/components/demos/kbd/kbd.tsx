import { Kbd } from '@tszhong0411/ui'

const KbdDemo = () => {
  return (
    <div className='flex gap-4'>
      <Kbd keys={['command']}>K</Kbd>
      <Kbd keys={['command', 'shift']}>N</Kbd>
      <Kbd keys={['option', 'command']}>P</Kbd>
    </div>
  )
}

export default KbdDemo
