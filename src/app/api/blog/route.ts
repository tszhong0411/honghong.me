import { NextResponse } from 'next/server'

import { site } from '@/config/site'

export const GET = async () => {
  const { likes } = await (await fetch(`${site.url}/api/likes`)).json()
  const { views } = await (await fetch(`${site.url}/api/views`)).json()

  return NextResponse.json({
    likes,
    views,
  })
}
