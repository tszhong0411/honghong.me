import { ComponentMeta, ComponentStory } from '@storybook/react'

import Files from './Files'

export default {
  title: 'Blog/Files',
  component: Files,
} as ComponentMeta<typeof Files>

const data = [
  {
    name: 'components',
    children: [
      {
        name: 'Layout.js',
      },
    ],
  },
  {
    name: 'data',
    children: [
      {
        name: 'blog',
        children: [
          {
            name: 'markdown.mdx',
          },
          {
            name: 'nextjs.mdx',
          },
          {
            name: 'react.mdx',
          },
        ],
      },
    ],
  },
  {
    name: 'lib',
    children: [
      {
        name: 'mdx.js',
      },
    ],
  },
  {
    name: 'pages',
    children: [
      {
        name: 'blog',
        children: [
          {
            name: '[slug].js',
          },
        ],
      },
    ],
  },
]

export const Base: ComponentStory<typeof Files> = (args) => <Files {...args} />

Base.args = {
  data,
  title: 'Folder structure',
}
