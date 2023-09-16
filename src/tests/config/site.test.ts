describe('config.site', () => {
  it('site url should be production url when NODE_ENV is production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    const url = (await import('@/config/site')).default.url

    expect(url).toBe('https://honghong.me')
  })

  it('site url should be development url when NODE_ENV is development', async () => {
    vi.resetModules()
    vi.stubEnv('NODE_ENV', 'development')
    const url = (await import('@/config/site')).default.url

    expect(url).toBe('http://localhost:3000')
  })

  it('site url should be vercel url when deployed platform is vercel', async () => {
    vi.resetModules()
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NEXT_PUBLIC_VERCEL_URL', 'honghongme-tszhong0411.vercel.app')
    const url = (await import('@/config/site')).default.url

    expect(url).toBe('https://honghongme-tszhong0411.vercel.app')
  })
})
