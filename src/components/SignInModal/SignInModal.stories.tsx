import { ComponentMeta, ComponentStory } from '@storybook/react'

import SignInModal from './SignInModal'

export default {
  title: 'Modal/SignIn',
  component: SignInModal,
} as ComponentMeta<typeof SignInModal>

export const Body: ComponentStory<typeof SignInModal> = () => (
  <SignInModal opened={true} onClose={() => null} />
)
