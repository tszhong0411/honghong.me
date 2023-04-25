import Giscus from '@giscus/react'

import { GISCUS_CONFIG } from '@/config/giscus'

const Comment = () => {
  return (
    <div className='my-8'>
      <Giscus theme='dark' {...GISCUS_CONFIG} />
    </div>
  )
}

export default Comment
