import { ComponentMeta, ComponentStory } from '@storybook/react'

import LikeButton from './LikeButton'

export default {
  title: 'Blog/LikeButton',
  component: LikeButton,
} as ComponentMeta<typeof LikeButton>

export const Base: ComponentStory<typeof LikeButton> = () => (
  <LikeButton slug='' />
)
