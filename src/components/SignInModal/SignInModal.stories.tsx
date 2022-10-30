import { ComponentMeta, ComponentStory } from '@storybook/react'

import SignInModal from './SignInModal'

export default {
  title: 'Modal/SignIn',
  component: SignInModal,
} as ComponentMeta<typeof SignInModal>

export const Base: ComponentStory<typeof SignInModal> = (args) => (
  <SignInModal onClose={() => null} {...args} />
)

Base.args = {
  title: 'Sign In',
  opened: true,
}
