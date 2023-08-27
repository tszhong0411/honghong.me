'use client'

import { Toaster as ReactHotToast } from 'react-hot-toast'

const Toaster = () => {
  return (
    <ReactHotToast
      position='bottom-right'
      toastOptions={{
        className: '!bg-background !text-foreground !border',
      }}
    />
  )
}

export default Toaster
