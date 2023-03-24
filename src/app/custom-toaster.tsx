'use client'

import { Toaster } from 'react-hot-toast'

const CustomToaster = () => {
  return (
    <Toaster
      position='bottom-right'
      toastOptions={{
        className: '!bg-accent-1 !text-hong-fg !border !border-accent-2',
      }}
    />
  )
}

export default CustomToaster
