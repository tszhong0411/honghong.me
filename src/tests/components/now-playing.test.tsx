import { screen, waitFor } from '@testing-library/react'
import { http } from 'msw'

import NowPlaying from '@/components/now-playing'

import { server } from '../mocks/server'
import { song, songPaused } from '../mocks/spotify'
import { renderWithSWRConfig } from '../utils'

describe('<NowPlaying />', () => {
  it('should have a link to the song when playing', async () => {
    renderWithSWRConfig(<NowPlaying />)

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
      http.get('/api/spotify', () =>
        Response.json(songPaused, {
          status: 200
        })
      )
    )

    renderWithSWRConfig(<NowPlaying />)

    await waitFor(() => {
      expect(screen.getByText('Not Listening - Spotify')).toBeInTheDocument()
    })
  })
})
