'use client'

import { useEffect } from 'react'

const Hello = () => {
  useEffect(() => {
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
