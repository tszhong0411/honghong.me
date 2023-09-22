import { queryHelpers, render } from '@testing-library/react'
import React from 'react'
import { SWRConfig } from 'swr'

/* c8 ignore start */
/**
 * Returns a function that queries for an element with the given attribute.
 * @param attr - The attribute to query for.
 * @returns A function that can be used to query for an element with the given attribute.
 */
export const queryByAttr = (attr: string) =>
  queryHelpers.queryByAttribute.bind(null, attr)

/**
 * Returns a function that queries for all elements with the given attribute.
 * @param attr - The attribute to query for.
 * @returns A function that can be used to query for all elements with the given attribute.
 */
export const queryAllByAttr = (attr: string) =>
  queryHelpers.queryAllByAttribute.bind(null, attr)
/* c8 ignore stop */

/**
 * Render a component with SWRConfig.
 * @param children - The children component to render.
 */
export const renderWithSWRConfig = (children: React.ReactNode) => {
  return render(
    <SWRConfig
      value={{
        dedupingInterval: 0
      }}
    >
      {children}
    </SWRConfig>
  )
}
