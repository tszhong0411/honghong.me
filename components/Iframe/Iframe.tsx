import { Box } from '@/components/Box'
interface Props {
  id: string
}

const CustomIframe = ({ id }: Props) => {
  return (
    <Box
      css={{
        position: 'relative',
        height: 0,
        width: '100%',
        pb: '56.25%',
        '& iframe': { position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' },
      }}
    >
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  )
}

export default CustomIframe
