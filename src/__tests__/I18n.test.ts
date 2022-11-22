import _ from 'lodash'

import en from '../../locales/en/common.json'
import zhTW from '../../locales/zh-TW/common.json'

describe('Internationalization', () => {
  it('Each language should have the same namespace', () => {
    expect(_.isEqual(Object.keys(zhTW), Object.keys(en))).toBe(true)
  })
})
