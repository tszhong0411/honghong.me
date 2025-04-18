import { Separator } from '@tszhong0411/ui'

const SeparatorDemo = () => {
  return (
    <div>
      <div className='space-y-1'>
        <h4 className='text-sm font-medium leading-none'>Radix Primitives</h4>
        <p className='text-muted-foreground text-sm'>An open-source UI component library.</p>
      </div>
      <Separator className='my-4' />
      <div className='flex h-5 items-center gap-4 text-sm'>
        <div>Blog</div>
        <Separator orientation='vertical' />
        <div>Docs</div>
        <Separator orientation='vertical' />
        <div>Source</div>
      </div>
    </div>
  )
}

export default SeparatorDemo
