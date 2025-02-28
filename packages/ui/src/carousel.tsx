import { cn } from '@tszhong0411/utils'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { createContext, use, useCallback, useEffect, useState } from 'react'

import { Button } from './button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  options?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)
CarouselContext.displayName = 'CarouselContext'

const useCarousel = () => {
  const context = use(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

type CarouselRootProps = React.ComponentProps<'div'> & CarouselProps

const Carousel = (props: CarouselRootProps) => {
  const {
    orientation = 'horizontal',
    options,
    setApi,
    plugins,
    className,
    children,
    ...rest
  } = props
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...options,
      axis: orientation === 'horizontal' ? 'x' : 'y'
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback((a: CarouselApi) => {
    if (!a) return

    setCanScrollPrev(a.canScrollPrev())
    setCanScrollNext(a.canScrollNext())
  }, [])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])

  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  useEffect(() => {
    if (!api || !setApi) return

    setApi(api)
  }, [api, setApi])

  useEffect(() => {
    if (!api) return

    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api.off('reInit', onSelect)
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext
      value={{
        carouselRef,
        api: api,
        options,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role='region'
        aria-roledescription='carousel'
        {...rest}
      >
        {children}
      </div>
    </CarouselContext>
  )
}

type CarouselContentProps = React.ComponentProps<'div'>

const CarouselContent = (props: CarouselContentProps) => {
  const { className, ...rest } = props
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...rest}
      />
    </div>
  )
}

type CarouselItemProps = React.ComponentProps<'div'>

const CarouselItem = (props: CarouselItemProps) => {
  const { className, ...rest } = props
  const { orientation } = useCarousel()

  return (
    <div
      role='group'
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...rest}
    />
  )
}

type CarouselPreviousProps = React.ComponentProps<typeof Button>

const CarouselPrevious = (props: CarouselPreviousProps) => {
  const { className, variant = 'outline', size = 'icon', ...rest } = props
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label='Previous slide'
      {...rest}
    >
      <ArrowLeft className='size-4' />
    </Button>
  )
}

type CarouselNextProps = React.ComponentProps<typeof Button>

const CarouselNext = (props: CarouselNextProps) => {
  const { className, variant = 'outline', size = 'icon', ...rest } = props
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label='Next slide'
      {...rest}
    >
      <ArrowRight className='size-4' />
    </Button>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }
