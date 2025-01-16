'use client'

import {
  type ComboboxInputValueChangeDetails,
  ComboboxLabel,
  createListCollection
} from '@tszhong0411/ui'
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxTrigger
} from '@tszhong0411/ui'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
    disabled: true
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
]

const initialCollection = createListCollection({ items: frameworks })

const ComboboxDemo = () => {
  const [collection, setCollection] = useState(initialCollection)
  const handleInputChange = (details: ComboboxInputValueChangeDetails) => {
    const filtered = frameworks.filter((item) =>
      item.label.toLowerCase().includes(details.inputValue.toLowerCase())
    )
    if (filtered.length > 0) setCollection(createListCollection({ items: filtered }))
  }

  const handleOpenChange = () => {
    setCollection(initialCollection)
  }

  return (
    <Combobox
      className='w-64'
      collection={collection}
      onInputValueChange={handleInputChange}
      onOpenChange={handleOpenChange}
    >
      <ComboboxLabel>Framework</ComboboxLabel>
      <ComboboxControl className='relative'>
        <ComboboxInput placeholder='Select a framework' className='pr-6' />
        <ComboboxTrigger className='absolute right-2 top-0 h-full'>
          <ChevronsUpDownIcon className='size-4 shrink-0 opacity-50' />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxItemGroup>
          <ComboboxItemGroupLabel>Frameworks</ComboboxItemGroupLabel>
          {collection.items.map((item) => (
            <ComboboxItem key={item.value} item={item}>
              <ComboboxItemText>{item.label}</ComboboxItemText>
              <ComboboxItemIndicator className='ml-auto'>
                <CheckIcon className='size-4' />
              </ComboboxItemIndicator>
            </ComboboxItem>
          ))}
        </ComboboxItemGroup>
      </ComboboxContent>
    </Combobox>
  )
}

export default ComboboxDemo
