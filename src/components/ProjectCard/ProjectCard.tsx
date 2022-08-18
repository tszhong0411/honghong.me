import { Box, Button, Card, Title } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { IconArrowRight } from '@tabler/icons'
import { motion } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'

import { ProjectCardProps } from '@/components/ProjectCard/types'

const ProjectsCard = ({ title, description, href }: ProjectCardProps) => {
  const { t } = useTranslation('common')
  const { hovered, ref } = useHover()

  return (
    <Card shadow='sm' radius='lg' p={32}>
      <Title order={2} m={0}>
        {title}
      </Title>
      <p>{description}</p>
      <Box sx={{ display: 'inline-block' }} ref={ref}>
        <Button
          component='a'
          target='_blank'
          rel='noopener noreferrer'
          href={href}
          rightIcon={
            <motion.div animate={{ x: hovered ? 5 : 0 }}>
              <IconArrowRight size={20} />
            </motion.div>
          }
          sx={{
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          {t('visit')}
        </Button>
      </Box>
    </Card>
  )
}

export default ProjectsCard
