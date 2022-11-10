import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from '@mantine/core'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import Layout from '@/components/Layout'

const useStyles = createStyles((theme) => ({
  root: {
    padding: '120px 0',
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 120,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.largerThan('sm')]: {
      fontSize: 220,
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 32,

    [theme.fn.largerThan('sm')]: {
      fontSize: 38,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

const FiveZeroZero = () => {
  const { classes } = useStyles()
  const { t } = useTranslation('common')
  const { reload } = useRouter()

  return (
    <Layout>
      <div className={classes.root}>
        <Container>
          <div className={classes.label}>500</div>
          <Title className={classes.title}>{t('500.title')}</Title>
          <Text size='lg' align='center' className={classes.description}>
            {t('500.description')}
          </Text>
          <Group position='center'>
            <Button variant='subtle' size='md' onClick={() => reload()}>
              {t('500.button')}
            </Button>
          </Group>
        </Container>
      </div>
    </Layout>
  )
}

export default FiveZeroZero
