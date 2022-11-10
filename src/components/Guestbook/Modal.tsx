import {
  Button,
  LoadingOverlay,
  Modal as MantineModal,
  ModalProps as MantineModalProps,
  Stack,
  Text,
} from '@mantine/core'
import { IconBrandGithub, IconBrandGoogle, TablerIcon } from '@tabler/icons'
import { BuiltInProviderType } from 'next-auth/providers'
import { signIn } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { useStyles } from './Modal.styles'

type Provider = {
  name: string
  provider: BuiltInProviderType
  icon: TablerIcon
}

type ModalProps = MantineModalProps

const Modal = (props: ModalProps) => {
  const { opened, onClose, title = 'sign in' } = props
  const { classes } = useStyles()
  const { t } = useTranslation('common')
  const [visible, setVisible] = React.useState(false)

  const Providers: Provider[] = [
    {
      name: 'Github',
      provider: 'github',
      icon: IconBrandGithub,
    },
    {
      name: 'Google',
      provider: 'google',
      icon: IconBrandGoogle,
    },
  ]

  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      title={title}
      overlayBlur={3}
      classNames={{
        title: classes.title,
      }}
      size='lg'
      centered
    >
      <Stack my={40}>
        <LoadingOverlay visible={visible} overlayBlur={3} />
        {Providers.map(({ name, provider, icon: Icon }) => (
          <Button
            key={name}
            variant='gradient'
            gradient={{ from: 'orange', to: 'red' }}
            sx={{
              fontWeight: 500,
            }}
            leftIcon={<Icon />}
            size='lg'
            onClick={() => {
              setVisible(true)
              signIn(provider)
            }}
          >
            {t('signInWith', { provider: name })}
          </Button>
        ))}
      </Stack>
      <Text size='sm' my={16} align='center'>
        {t('Guestbook.tip')}
      </Text>
    </MantineModal>
  )
}

export default Modal
