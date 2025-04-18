import { ScrollArea } from '@tszhong0411/ui'

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

const ScrollAreaDemo = () => {
  return (
    <ScrollArea className='h-72 w-48 rounded-lg border'>
      <div className='px-4 text-sm'>
        <h4 className='py-2 font-medium'>Tags</h4>
        {TAGS.map((tag) => (
          <div key={tag} className='flex h-10 items-center border-t'>
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default ScrollAreaDemo
