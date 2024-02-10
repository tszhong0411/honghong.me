'use client'

import * as React from 'react'

const Hello = () => {
  React.useEffect(() => {
    console.log(`
██╗  ██╗ ██████╗ ███╗   ██╗ ██████╗
██║  ██║██╔═══██╗████╗  ██║██╔════╝
███████║██║   ██║██╔██╗ ██║██║  ███╗
██╔══██║██║   ██║██║╚██╗██║██║   ██║
██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝

`)
  }, [])

  return null
}

export default Hello
