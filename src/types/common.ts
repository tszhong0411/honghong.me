/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type WithChildren = { children: React.ReactNode }

export type WithClassName<T = {}> = T & {
  className?: string
}

export type WithProps<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<U>,
  U = any
> = React.ComponentProps<T>
