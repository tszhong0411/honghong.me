import { Button, ButtonProps, Group, Paper, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { BrandGithub, BrandGoogle } from 'tabler-icons-react'

import Layout from '@/components/Layout'

const GithubButton = (
  props: ButtonProps & React.ComponentPropsWithRef<'button'>
) => {
  return (
    <Button
      {...props}
      leftIcon={<BrandGithub />}
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
      leftIcon={<BrandGoogle />}
      variant='default'
      color='gray'
      {...props}
    />
  )
}

export default function Signin() {
  const router = useRouter()
  const { t } = useTranslation()

  const signInHandler = (oauth: string) => {
    const callbackUrl = router.query.callbackUrl

    /*
       檢查 query.callbackUrl 是否為 array，最後返回 string
       (類型 'string | string[]' 不可指派給類型 'string')
    */
    if (Array.isArray(callbackUrl)) {
      return signIn(oauth, { callbackUrl: callbackUrl[0] })
    }

    return signIn(oauth, { callbackUrl: callbackUrl })
  }

  // TODO: add more login method

  return (
    <Layout templateTitle='Sign in' description='A sign in page'>
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
          {t('common:Signin_title')}
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
