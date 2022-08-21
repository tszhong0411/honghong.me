import formatDate from '../formatDate'

describe('Format date', () => {
  it('Should return valid format of date', () => {
    const zhDate = formatDate('1990-01-01', 'zh-TW')
    const enDate = formatDate('1990-01-01', 'en')

    expect(zhDate).toBe('1990年1月1日')
    expect(enDate).toBe('January 1, 1990')
  })
})
