import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from '@tszhong0411/i18n/client'
import messages from '@tszhong0411/i18n/messages/en.json'
import { describe, expect, it } from 'vitest'

import Hero from '@/components/home/hero'

describe('<Hero />', () => {
  it('should have a hero image', () => {
    render(
      <NextIntlClientProvider locale='en' messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    )

    expect(screen.getByAltText('Nelson Lai')).toBeInTheDocument()
  })
})
