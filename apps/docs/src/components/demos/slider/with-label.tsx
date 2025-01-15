import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack
} from '@tszhong0411/ui'

const SliderWithLabelDemo = () => {
  return (
    <Slider defaultValue={[10]} className='w-3/5'>
      <SliderLabel>Label</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} />
      </SliderControl>
    </Slider>
  )
}

export default SliderWithLabelDemo
