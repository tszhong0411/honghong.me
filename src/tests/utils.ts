import { queryHelpers } from '@testing-library/react'
/* c8 ignore start */
export const queryByAttr = (attr: string) =>
  queryHelpers.queryByAttribute.bind(null, attr)

export const queryAllByAttr = (attr: string) =>
  queryHelpers.queryAllByAttribute.bind(null, attr)
/* c8 ignore stop */
