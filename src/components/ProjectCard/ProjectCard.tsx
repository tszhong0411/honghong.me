import { Badge, Card, Flex, Skeleton, Text } from '@mantine/core'
import { IconStar } from '@tabler/icons'
import Image from 'next/image'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

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
  repoName?: string
}

const ProjectsCard = (props: ProjectCardProps) => {
  const { title, description, href, image, badges, repoName } = props
  const { classes } = useStyles()
  const { data } = useSWR<{ stars: number }>(
    repoName ? `/api/github/stars/${repoName}` : null,
    fetcher
  )

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
          {repoName && (
            <div className={classes.stars}>
              {data ? (
                <Flex align='center' gap={4}>
                  <IconStar size={16} />
                  <Text lh='16px'>{data.stars}</Text>
                </Flex>
              ) : (
                <Skeleton height={16} w={40} />
              )}
            </div>
          )}
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
