'use client'

import { Sortable, SortableContent, SortableItem, SortableOverlay } from '@tszhong0411/ui'
import { useState } from 'react'

const SortableDemo = () => {
  const [languages, setLanguages] = useState([
    {
      id: '1',
      title: 'JavaScript',
      description: 'A versatile programming language for web development and beyond.'
    },
    {
      id: '2',
      title: 'Python',
      description: 'A high-level language known for its simplicity and readability.'
    },
    {
      id: '3',
      title: 'TypeScript',
      description: 'JavaScript with static type definitions for better development experience.'
    },
    {
      id: '4',
      title: 'Rust',
      description: 'A systems programming language focused on safety and performance.'
    },
    {
      id: '5',
      title: 'Go',
      description: 'A compiled language designed for simplicity and efficient concurrency.'
    },
    {
      id: '6',
      title: 'Swift',
      description: 'A powerful language for iOS, macOS, and server-side development.'
    }
  ])

  return (
    <Sortable
      value={languages}
      onValueChange={setLanguages}
      getItemValue={(item) => item.id}
      orientation='mixed'
    >
      <SortableContent className='grid auto-rows-fr grid-cols-3 gap-2.5'>
        {languages.map((language) => (
          <SortableItem key={language.id} value={language.id} asChild asHandle>
            <div className='text-foreground flex size-full flex-col gap-1 rounded-md border bg-zinc-100 p-4 shadow-sm dark:bg-zinc-900'>
              <div className='text-sm font-medium leading-tight sm:text-base'>{language.title}</div>
              <span className='text-muted-foreground line-clamp-2 hidden text-sm sm:inline-block'>
                {language.description}
              </span>
            </div>
          </SortableItem>
        ))}
      </SortableContent>
      <SortableOverlay>
        <div className='bg-primary/10 size-full rounded-md' />
      </SortableOverlay>
    </Sortable>
  )
}

export default SortableDemo
