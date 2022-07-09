import {
  Button,
  ButtonProps,
  Divider,
  Group,
  Paper,
  Text,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { BrandGithub, BrandGoogle } from 'tabler-icons-react';

import Layout from '@/components/Layout';

const GithubButton = (props: ButtonProps<'button'>) => {
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
  );
};

const GoogleButton = (props: ButtonProps<'button'>) => {
  return (
    <Button
      leftIcon={<BrandGoogle />}
      variant='default'
      color='gray'
      {...props}
    />
  );
};

export default function Signin() {
  const router = useRouter();

  const signInHandler = (oauth: string) => {
    const callbackUrl = router.query.callbackUrl;

    if (Array.isArray(callbackUrl)) {
      return signIn(oauth, { callbackUrl: callbackUrl[0] });
    }

    return signIn(oauth, { callbackUrl: callbackUrl });
  };

  return (
    <Layout templateTitle='Sign in' description='A sign in page'>
      <Paper
        radius='md'
        p='xl'
        withBorder
        sx={{
          maxWidth: 420,
          margin: '0 auto',
        }}
      >
        <Text size='lg' weight={500}>
          Welcome to honghong.me, login with
        </Text>

        <Group grow mb='md' mt='md'>
          <GithubButton onClick={() => signInHandler('github')}>
            Github
          </GithubButton>
          <GoogleButton onClick={() => signInHandler('google')}>
            Google
          </GoogleButton>
        </Group>

        <Divider
          label='Or continue with email'
          labelPosition='center'
          my='lg'
        />

        <form>
          <Group direction='column' grow>
            email
          </Group>

          <Group position='apart' mt='xl'>
            <Button type='submit'>Login</Button>
          </Group>
        </form>
      </Paper>
    </Layout>
  );
}
