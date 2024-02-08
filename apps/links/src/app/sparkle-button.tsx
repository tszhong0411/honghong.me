import { cn } from '@tszhong0411/utils'
import React from 'react'

type SparkleButtonProps = {
  children: React.ReactNode
  className?: string
}

type TextProps = {
  children: React.ReactNode
}

type ParticleProps = React.SVGAttributes<SVGElement>

const Particle = (props: ParticleProps) => (
  <svg
    className='absolute left-[calc(var(--x)*1%)] top-[calc(var(--y)*1%)] -z-10 w-[calc(var(--size,0.25)*1rem)] origin-[var(--origin-x,1000%)_var(--origin-y,1000%)] animate-float-out fill-white opacity-[var(--alpha,1)] [animation-play-state:var(--play-state,_paused)] even:[animation-direction:reverse]'
    aria-label='A particle'
    viewBox='0 0 15 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      className='fill-[hsl(0_0%_90%)] stroke-none'
      d='M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const SparkleButton = (props: SparkleButtonProps) => {
  const { children, className } = props

  return (
    <div
      className={cn(
        'relative inline-block [--spark:1.8s] [--transition:0.25s]',
        className
      )}
    >
      {children}
      <span
        aria-hidden='true'
        className='absolute left-1/2 top-1/2 -z-10 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 opacity-[var(--active,0)] [-webkit-mask:radial-gradient(white,transparent_65%)] [transition:opacity_var(--transition)] peer-hover:[--active:1] peer-hover:[--play-state:running]'
      >
        {[...Array.from({ length: 20 }).keys()].map((i) => {
          const RANDOM = (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1) + min)

          return (
            <Particle
              key={i}
              style={
                {
                  '--x': `${RANDOM(20, 80)}`,
                  '--y': `${RANDOM(20, 80)}`,
                  '--duration': `${RANDOM(6, 20)}`,
                  '--delay': `${RANDOM(1, 10)}`,
                  '--alpha': `${RANDOM(40, 90) / 100}`,
                  '--origin-x': `${
                    Math.random() > 0.5
                      ? RANDOM(300, 800) * -1
                      : RANDOM(300, 800)
                  }%`,
                  '--origin-y': `${
                    Math.random() > 0.5
                      ? RANDOM(300, 800) * -1
                      : RANDOM(300, 800)
                  }%`,
                  '--size': `${RANDOM(40, 90) / 100}`
                } as React.CSSProperties
              }
            />
          )
        })}
      </span>
    </div>
  )
}

const Spark = () => (
  <span className='absolute inset-0 animate-flip overflow-hidden rounded-[100px] [mask:linear-gradient(white,transparent_50%)] [rotate:0deg] before:absolute before:left-1/2 before:top-[0%] before:aspect-square before:w-[200%] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:opacity-[calc(var(--active)+0.4)] before:[transform:rotate(-90deg)] before:[transition:opacity_var(--transition)] before:[translate:-50%_-15%] after:absolute after:inset-[--cut] after:rounded-[100px]' />
)

const Backdrop = () => (
  <span className='absolute inset-[--cut] rounded-[100px] transition-[background_var(--transition)] [background:--bg]' />
)

const Text = (props: TextProps) => {
  const { children } = props

  return (
    <span className='translate-x-[2%] translate-y-[-6%] bg-[linear-gradient(90deg,hsl(0_0%_calc((var(--active)*100%)+65%)),hsl(0_0%_calc((var(--active)*100%)+36%)))] tracking-[0.01ch] text-transparent transition-[background_var(--transition)] [-webkit-background-clip:text]'>
      {children}
    </span>
  )
}

const ClassName = cn(
  'peer relative flex scale-[calc(1+var(--active)*0.1)] items-center gap-[0.25em] whitespace-nowrap rounded-[100px] px-6 py-4 font-medium transition-[shadow_var(--transition,scale_var(--transition),background_var(--transition))] [background:--bg] [--active:0] [--cut:0.1em] before:absolute before:inset-[-0.25em] before:-z-10 before:rounded-[100px] before:border-[0.25em] before:border-solid before:border-[hsl(0_0%_20.08%/0.5)] before:opacity-[var(--active,0)] before:transition-[opacity_var(--transition)] hover:[--active:1] hover:[--play-state:running] active:scale-100',
  '[--bg:radial-gradient(80%_100%_at_center_120%,hsl(0_0%_20%/var(--active)),transparent),hsl(260_0%_12%)]',
  'shadow-[0_0_calc(var(--active)*6em)_calc(var(--active)*3em)_hsl(0_0%_13.08%/75%),0_0.05em_0_0_hsl(0_0%_calc((var(--active)*20%)+30%))_inset,0_-0.05em_0_0_hsl(0_0%_calc(var(--active)*30%))_inset]'
)

SparkleButton.Spark = Spark
SparkleButton.Backdrop = Backdrop
SparkleButton.Text = Text
SparkleButton.ClassName = ClassName

export default SparkleButton
