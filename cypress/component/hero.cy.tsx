import '@/styles/globals.css'

import Hero from '@/components/hero'

import { HERO_LINKS } from '@/config/links'

describe('Hero', () => {
  it('should have 5 social links', () => {
    cy.mount(<Hero />)

    HERO_LINKS.forEach((link) => {
      cy.get(`a[href="${link.href}"]`).should('exist')
    })
  })
})
