import { render, screen } from '@testing-library/react'
import React from 'react'

import ItemGrid from '@/components/mdx/item-grid'

describe('<ItemGrid />', () => {
  it('renders a grid of items', () => {
    const items = [
      {
        image: '/image-1.jpg',
        name: 'Item 1',
        description: 'Description 1',
        url: 'https://example.com/item1'
      },
      {
        image: '/image-2.jpg',
        name: 'Item 2',
        description: 'Description 2',
        url: 'https://example.com/item2'
      }
    ]

    render(<ItemGrid items={items} />)

    for (const item of items) {
      const itemElement = screen.getByText(item.name)
      expect(itemElement).toBeInTheDocument()

      const descriptionElement = screen.getByText(item.description)
      expect(descriptionElement).toBeInTheDocument()

      const imageElement = screen.getByAltText(item.name)
      expect(imageElement).toBeInTheDocument()

      const linkElements = screen.getAllByRole('link')
      const matchingLink = linkElements.find(
        (link) => link.getAttribute('href') === item.url
      )
      expect(matchingLink).toBeInTheDocument()
    }
  })
})
