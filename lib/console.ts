import { commentFlag, incrementFlag, spotifyFlag } from '@/constants/env'

export default function EnvStatus() {
  console.log(
    `ViewCounter enable: ${incrementFlag}\nComment enable: ${commentFlag}\nSpotify enable: ${spotifyFlag}`
  )
}
