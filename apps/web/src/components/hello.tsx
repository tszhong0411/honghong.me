'use client'

import React from 'react'

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
