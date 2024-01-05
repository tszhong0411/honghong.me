// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports
import type * as CSS from 'csstype'

declare module 'csstype' {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/consistent-type-definitions
  interface Properties {
    [index: `--${string}`]: string | number
  }
}
