import { useInView, useMotionValue, useSpring } from 'framer-motion'
import * as React from 'react'

type CounterProps = {
  value: number
  direction?: 'up' | 'down'
} & React.ComponentPropsWithoutRef<'span'>

const Counter = (props: CounterProps) => {
  const { value, direction = 'up', ...rest } = props
  const ref = React.useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 300
  })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value)
    }
  }, [motionValue, isInView, direction, value])

  React.useEffect(() => {
    if (ref.current && value === 0) {
      ref.current.textContent = '0'

      return
    }

    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(0)
      }
    })
  }, [springValue, value])

  return <span ref={ref} {...rest} />
}

export default Counter
