import { Badge, Card, Flex, Text } from '@mantine/core'
import Image from 'next/image'

import { useStyles } from './ProjectCard.styles'
import Link from '../Link'

type Badge = {
  icon: React.ReactNode
  label: string
}

export type ProjectCardProps = {
  title: string
  description: string
  href: string
  image: string
  badges: Badge[]
}

const ProjectsCard = (props: ProjectCardProps) => {
  const { title, description, href, image, badges } = props
  const { classes } = useStyles()

  const features = badges.map((badge, i) => (
    <div key={i} className={classes.tech}>
      {badge.icon}
      <Text size={12} lh='16px'>
        {badge.label}
      </Text>
    </div>
  ))

  return (
    <>
      <Card
        component={Link}
        href={href}
        variant='text'
        icon={false}
        withBorder
        radius='md'
        px='md'
        className={classes.card}
      >
        <Card.Section pos='relative' h={200} sx={{ overflow: 'hidden' }}>
          <Image
            src={image}
            alt={title}
            className={classes.image}
            fill
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
          />
        </Card.Section>

        <Card.Section className={classes.section} mt='md'>
          <Text size='lg' weight={500}>
            {title}
          </Text>
          <Text size='sm' mt='xs'>
            {description}
          </Text>
        </Card.Section>
        <Card.Section className={classes.section}>
          <Text mt='md' className={classes.label} color='dimmed'>
            Tech stack
          </Text>
          <Flex gap={7} mt={5} wrap='wrap'>
            {features}
          </Flex>
        </Card.Section>
      </Card>
    </>
  )
}

export default ProjectsCard
