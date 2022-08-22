import Link from '../Link'

import { Button, Card, Title } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'

import { ProjectCardProps } from '@/components/ProjectCard/types'

const ProjectsCard = ({ title, description, href }: ProjectCardProps) => {
  const { t } = useTranslation('common')

  return (
    <Card shadow='sm' radius='lg' p={32}>
      <Title order={2} m={0}>
        {title}
      </Title>
      <p>{description}</p>
      <Button
        component={Link}
        href={href}
        variant='light'
        fullWidth
        mt='md'
        radius='md'
        noIcon
        underline={false}
      >
        {t('visit')}
      </Button>
    </Card>
  )
}

export default ProjectsCard
