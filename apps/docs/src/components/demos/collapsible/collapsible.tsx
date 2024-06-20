'use client'

import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@tszhong0411/ui'
import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-[350px] space-y-2'>
      <div className='flex items-center justify-between gap-4 px-4'>
        <h4 className='text-sm font-semibold'>@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <Button type='button' variant='ghost' size='sm' className='w-9 p-0'>
            <span className='sr-only'>Toggle</span>
            <ChevronsUpDown className='size-4' />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className='rounded-md border px-4 py-3 font-mono text-sm'>@radix-ui/primitives</div>
      <CollapsibleContent className='space-y-2'>
        <div className='rounded-md border px-4 py-3 font-mono text-sm'>@radix-ui/colors</div>
        <div className='rounded-md border px-4 py-3 font-mono text-sm'>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleDemo
