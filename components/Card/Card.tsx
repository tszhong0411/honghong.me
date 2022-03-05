import Link from '@/components/Link'
import useTranslation from 'next-translate/useTranslation'
import { Box } from '@/components/Box'
import { Text } from '@/components/Text'

const Card = ({ title, description, href }) => {
  const { t } = useTranslation()

  return (
    <Box
      css={{
        width: '100%',
        borderRadius: '$2',
        linearGradient: 'to right, #6366f1, #a855f7, #ec4899',
        p: '2px',
        '@md': {
          width: '50%',
        },
      }}
    >
      <Box css={{ borderRadius: '$2', backgroundColor: '$honghong-colors-body-secondary' }}>
        <Box
          css={{
            overflow: 'hidden',
            borderRadius: '$2',
            borderWidth: '$2',
            borderColor: '$honghong-colors-border-primary',
          }}
        >
          <Box
            css={{
              p: '$5',
            }}
          >
            <Text
              size={6}
              as="h2"
              css={{
                mb: '$3',
                fontWeight: 700,
              }}
            >
              {title}
            </Text>
            <Text
              size={3}
              as="p"
              css={{
                mb: '$3',
                maxWidth: 'none',
                color: '$honghong-colors-typeface-secondary',
              }}
            >
              {description}
            </Text>
            {href && (
              <Link href={href} underline variant="red" aria-label={`Link to ${title}`}>
                {t('common:learnMore')}
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Card
