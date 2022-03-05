import { Flex } from '../Flex'
import { Text } from '@/components/Text'
import Link from '@/components/Link'

export default function Track(track) {
  return (
    <Flex
      direction={'row'}
      alignItems={'baseline'}
      css={{
        mt: '$3',
        width: '100%',
        maxWidth: '$max-w-3xl',
      }}
    >
      <Text size={2} as="p" css={{ fontWeight: 700, color: '$honghong-colors-typeface-secondary' }}>
        {track.ranking}
      </Text>
      <Flex direction={'column'} css={{ pl: '$3', pt: '$3' }}>
        <Link href={track.songUrl}>{track.title}</Link>
        <Text
          size={3}
          as="p"
          css={{
            mb: '$4',
            fontSize: '$sm',
            color: '$honghong-colors-typeface-secondary',
            width: 'calc($14 - 16px)',
            '@sm': {
              width: 'calc($14 + 128px)',
            },
            '@md': {
              width: '100%',
            },
          }}
        >
          {track.artist}
        </Text>
      </Flex>
    </Flex>
  )
}
