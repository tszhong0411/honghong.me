import { Button, ButtonProps, Group, Paper, Text } from '@mantine/core'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import Layout from '@/components/Layout'

const GithubButton = (
  props: ButtonProps & React.ComponentPropsWithRef<'button'>
) => {
  return (
    <Button
      {...props}
      leftIcon={<IconBrandGithub />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:hover': {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        },
      })}
    />
  )
}

const GoogleButton = (
  props: ButtonProps & React.ComponentPropsWithRef<'button'>
) => {
  return (
    <Button
      leftIcon={<IconBrandGoogle />}
      variant='default'
      color='gray'
      {...props}
    />
  )
}

export default function Signin() {
  const router = useRouter()
  const { t } = useTranslation('common')

  const signInHandler = (oauth: string) => {
    const callbackUrl = router.query.callbackUrl as string

    return signIn(oauth, { callbackUrl: callbackUrl })
  }

  return (
    <Layout title='Sign in' description='A sign in page'>
      <Paper
        radius='md'
        p='xl'
        withBorder
        sx={{
          maxWidth: 420,
          margin: '120px auto',
        }}
      >
        <Text size='lg' weight={500}>
          {t('SignIn.title')}
        </Text>

        <Group grow mb='md' mt='md'>
          <GithubButton onClick={() => signInHandler('github')}>
            Github
          </GithubButton>
          <GoogleButton onClick={() => signInHandler('google')}>
            Google
          </GoogleButton>
        </Group>
      </Paper>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {},
  }
}
