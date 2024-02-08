import { cn } from '@tszhong0411/utils'
import React from 'react'

type SpotlightProps = {
  className?: string
}

const Spotlight = (props: SpotlightProps) => {
  const { className } = props

  return (
    <svg
      className={cn(
        'pointer-events-none absolute z-10 h-[169%] w-[84%] animate-spotlight opacity-0',
        className
      )}
      aria-label='A spotlight effect'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 3787 2842'
      fill='none'
    >
      <g filter='url(#filter)'>
        <ellipse
          cx='1924.71'
          cy='273.501'
          rx='1924.71'
          ry='273.501'
          transform='matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)'
          fill='white'
          fillOpacity='0.21'
        />
      </g>
      <defs>
        <filter
          id='filter'
          x='0.860352'
          y='0.838989'
          width='3785.16'
          height='2840.26'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur stdDeviation='151' />
        </filter>
      </defs>
    </svg>
  )
}

export default Spotlight
