'use client'

import React from 'react'
import { useEvent } from 'react-use'

import Skeleton from '../Skeleton'

const CommentCounter = () => {
  const [counter, setCounter] = React.useState(-1)

  useEvent('message', (e: MessageEvent) => {
    if (e.origin !== 'https://giscus.app') return
    if (!(typeof e.data === 'object' && e.data.giscus)) return

    const giscus = e.data.giscus

    if (giscus.error) {
      setCounter(0)
      return
    }

    if (giscus.discussion) {
      setCounter(
        giscus.discussion.totalCommentCount + giscus.discussion.totalReplyCount
      )
    }
  })

  return (
    <>
      {counter < 0 ? (
        <Skeleton className='h-5 max-w-[70px]' />
      ) : (
        <div>{`${counter} comments`}</div>
      )}
    </>
  )
}

export default CommentCounter
