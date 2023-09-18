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
})
