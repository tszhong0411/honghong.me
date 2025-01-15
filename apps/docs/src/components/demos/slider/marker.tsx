import {
  Slider,
  SliderControl,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumb,
  SliderTrack
} from '@tszhong0411/ui'

const SliderDemo = () => {
  return (
    <Slider defaultValue={[10]} className='w-3/5'>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} />
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker value={25}>25</SliderMarker>
        <SliderMarker value={50}>50</SliderMarker>
        <SliderMarker value={75}>75</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
  )
}

export default SliderDemo
