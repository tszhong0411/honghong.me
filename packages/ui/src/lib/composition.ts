/**
 * primitives (MIT License)
 * Copyright (c) WorkOS
 * Source:
 *  - https://github.com/radix-ui/primitives/blob/79304015e13a31bc465545fa1d20e743a0bce3c5/packages/core/primitive/src/primitive.tsx
 *  - https://github.com/radix-ui/primitives/blob/79304015e13a31bc465545fa1d20e743a0bce3c5/packages/react/compose-refs/src/compose-refs.tsx
 *
 * Modified by: tszhong0411
 */
import { useCallback } from 'react'

const composeEventHandlers = <E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  return (event: E) => {
    originalEventHandler?.(event)

    if (!checkForDefaultPrevented || !(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event)
    }
  }
}

type PossibleRef<T> = React.Ref<T> | undefined

const setRef = <T>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === 'function') {
    return ref(value)
  }

  if (ref !== null && ref !== undefined) {
    ref.current = value
  }
}

const composeRefs = <T>(...refs: Array<PossibleRef<T>>): React.RefCallback<T> => {
  return (node) => {
    for (const ref of refs) setRef(ref, node)
  }
}

const useComposedRefs = <T>(...refs: Array<PossibleRef<T>>): React.RefCallback<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- it's fine
  return useCallback(composeRefs(...refs), refs)
}

export { composeEventHandlers, useComposedRefs }
