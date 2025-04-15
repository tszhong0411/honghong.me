'use client'

import { type ComboboxInputValueChangeDetails, createListCollection } from '@ark-ui/react'
import { useState } from 'react'

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
  ComboboxTrigger
} from '@/components/ui/combobox'

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
      className='w-48'
      collection={collection}
      onInputValueChange={handleInputChange}
      onOpenChange={handleOpenChange}
    >
      <ComboboxLabel>Framework</ComboboxLabel>
      <ComboboxTrigger>
        <ComboboxInput placeholder='Select a framework' />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxItemGroup>
          <ComboboxItemGroupLabel>Frameworks</ComboboxItemGroupLabel>
          {collection.items.map((item) => (
            <ComboboxItem key={item.value} item={item}>
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxItemGroup>
      </ComboboxContent>
    </Combobox>
  )
}

export default ComboboxDemo
