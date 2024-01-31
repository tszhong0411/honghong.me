describe('config.site', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('has a production site url when NODE_ENV is production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    const url = (await import('@/config/site')).default.url

    expect(url).toBe('https://honghong.me')
  })

  it('has a development site url when NODE_ENV is development', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    const url = (await import('@/config/site')).default.url

    expect(url).toBe('http://localhost:3000')
  })
})
