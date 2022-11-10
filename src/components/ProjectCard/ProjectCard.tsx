import { Button, Card, Title } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'

import Link from '../Link'

type ProjectCardProps = {
  title: string
  description: string
  href: string
}

const ProjectsCard = (props: ProjectCardProps) => {
  const { title, description, href } = props
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
        icon={false}
        underline={false}
      >
        {t('visit')}
      </Button>
    </Card>
  )
}

export default ProjectsCard
