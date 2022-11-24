import { Card, Flex, SimpleGrid, Text } from '@mantine/core'
import Image from 'next/image'

import { useStyles } from './ItemGrid.styles'
import Link from '../Link'

type HardwareGirdProps = {
  items: {
    image: string
    name: string
    description: string
    url: string
  }[]
}

const HardwareGrid = (props: HardwareGirdProps) => {
  const { items } = props
  const { classes } = useStyles()

  return (
    <SimpleGrid cols={4} breakpoints={[{ maxWidth: 640, cols: 1 }]} mb={36}>
      {items.map((item, i) => (
        <Card
          component={Flex}
          direction={{
            base: 'row',
            sm: 'column',
          }}
          gap={{
            base: 24,
            sm: 12,
          }}
          key={i}
          withBorder
          radius='md'
        >
          <Image
            src={item.image}
            width={256}
            height={256}
            alt={item.name}
            className={classes.image}
            priority
          />
          <Flex direction='column' gap={8} justify='center'>
            <span>
              <Link
                href={item.url}
                icon={false}
                variant='text'
                color='white'
                className={classes.name}
                style={{
                  fontWeight: 800,
                }}
              >
                {item.name}
              </Link>
            </span>
            <Text>{item.description}</Text>
          </Flex>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default HardwareGrid
