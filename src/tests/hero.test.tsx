import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import Hero from '@/components/hero'
import { HERO_LINKS } from '@/config/links'

describe('hero', () => {
  test('social links', () => {
    render(<Hero />)

    for (const link of HERO_LINKS) {
      expect(screen.getByLabelText(link.label)).toBeDefined()
    }
  })
})
