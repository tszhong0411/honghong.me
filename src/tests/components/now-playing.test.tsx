import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { SWRConfig } from 'swr'

import NowPlaying from '@/components/now-playing'

import { server } from '../mocks/server'
import { song, songPaused } from '../mocks/spotify'

describe('<NowPlaying />', () => {
  it('should have a link to the song when playing', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <NowPlaying />
      </SWRConfig>
    )

    await waitFor(() => {
      if (song.isPlaying) {
        expect(
          screen.getByRole('link', {
            name: `${song.name} - ${song.artist}`
          })
        ).toHaveAttribute('href', song.songUrl)
      }
    })
  })

  it('should have no link when not playing', async () => {
    server.use(
      rest.get('http://localhost:3000/api/spotify', (_, res, ctx) =>
        res(ctx.status(200), ctx.json(songPaused))
      )
    )

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <NowPlaying />
      </SWRConfig>
    )

    await waitFor(() => {
      expect(screen.getByText('Not Listening - Spotify')).toBeInTheDocument()
    })
  })
})
