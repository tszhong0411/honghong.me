import { BlurFade } from '@tszhong0411/ui'

const BlurFadeDemo = () => {
  return (
    <div className='flex flex-col gap-2'>
      <BlurFade className='text-2xl font-semibold'>Hello, World!</BlurFade>
      <BlurFade delay={0.05}>This is a demo of the BlurFade component.</BlurFade>
    </div>
  )
}

export default BlurFadeDemo
