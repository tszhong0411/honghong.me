import { render } from '@testing-library/react'

import Link from '@/components/Link'

describe('@/components/Link', () => {
  it('Should have rel, target and icon if it is an external link', () => {
    const { container: externalLink } = render(
      <Link href='https://honghong.me' />
    )

    expect(externalLink.querySelector('a').getAttribute('rel')).toBe(
      'noopener noreferrer'
    )
    expect(externalLink.querySelector('a').getAttribute('target')).toBe(
      '_blank'
    )
    expect(externalLink.querySelector('a svg')).not.toBe(null)
  })

  it('Should not have an icon if it is an external link with an icon false, or an internal link', () => {
    const { container: internalLink } = render(<Link href='/' />)
    const { container: externalLink } = render(
      <Link href='https://honghong.me' icon={false} />
    )

    expect(internalLink.querySelector('a').getAttribute('rel')).toBe(null)
    expect(internalLink.querySelector('a').getAttribute('target')).toBe(null)
    expect(internalLink.querySelector('a svg')).toBe(null)
    expect(externalLink.querySelector('a svg')).toBe(null)
  })
})
