import type { PlopTypes } from '@turbo/gen'

export const postGenerator = (plop: PlopTypes.NodePlopAPI): void => {
  plop.setGenerator('blog', {
    description: 'Create a new blog post',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the post?'
      },
      {
        type: 'input',
        name: 'date',
        message: 'What is the date of the post?',
        default: new Date().toISOString().split('T')[0],
        validate: (input: string) => {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
            return 'Date should be in the format of YYYY-MM-DD.'
          }

          return true
        }
      },
      {
        type: 'input',
        name: 'summary',
        message: 'What is the summary of the post?'
      },
      {
        type: 'input',
        name: 'slug',
        message: 'What is the slug (file name) of the post?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'apps/web/src/content/blog/{{ slug }}.mdx',
        templateFile: 'templates/post/blog-post.mdx.hbs'
      }
    ]
  })
}
