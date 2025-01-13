import type { PlopTypes } from '@turbo/gen'
import { execSync } from 'node:child_process'
import { Project, type PropertyAssignment, SyntaxKind } from 'ts-morph'

import { capitalize } from '../../utils'

const LINKS_CONFIG_PATH = 'apps/docs/src/config/links.ts'

export const componentGenerator = (plop: PlopTypes.NodePlopAPI): void => {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of the component?'
      }
    ],
    actions: (answers) => {
      const actions: PlopTypes.Actions = [
        {
          type: 'add',
          path: 'packages/ui/src/{{ name }}.tsx',
          templateFile: 'templates/component/component.tsx.hbs'
        },
        {
          type: 'add',
          path: 'apps/docs/src/components/demos/{{ name }}/{{ name }}.tsx',
          templateFile: 'templates/component/demo.tsx.hbs'
        },
        {
          type: 'add',
          path: 'apps/docs/src/app/ui/components/{{ name }}.mdx',
          templateFile: 'templates/component/component.mdx.hbs'
        },
        async () => {
          try {
            const name = (answers as { name: string }).name
            const project = new Project()
            const sourceFile = project.addSourceFileAtPath(LINKS_CONFIG_PATH)
            const COMPONENT_LINKS = sourceFile.getVariableDeclaration('COMPONENT_LINKS')
            if (!COMPONENT_LINKS) throw new Error('Cannot find COMPONENT_LINKS declaration')
            const initializer = COMPONENT_LINKS.getInitializerIfKindOrThrow(
              SyntaxKind.ArrayLiteralExpression
            )
            const elements = initializer
              .getElements()
              .map((element) => element.asKind(SyntaxKind.ObjectLiteralExpression))
              .filter((obj): obj is NonNullable<typeof obj> => obj !== undefined)
              .map((obj) => ({
                href: (obj.getProperty('href') as PropertyAssignment).getInitializer()!.getText(),
                text: (obj.getProperty('text') as PropertyAssignment).getInitializer()!.getText()
              }))
            elements.push({
              href: `'/ui/components/${name}'`,
              text: `'${capitalize(name)}'`
            })
            elements.sort((a, b) => a.text.localeCompare(b.text))
            for (let i = initializer.getElements().length - 1; i >= 0; i--) {
              initializer.removeElement(i)
            }
            for (const element of elements) {
              initializer.addElement(`\
{
  href: ${element.href},
  text: ${element.text}
}`)
            }
            await sourceFile.save()
            return `Modify links.ts successfully!`
          } catch {
            throw new Error('Failed to modify links.ts')
          }
        }
      ]

      if (!answers?.name) throw new Error('Component name is required')

      // Update the index.ts file in UI package
      actions.push(
        {
          type: 'append',
          path: 'packages/ui/src/index.ts',
          template: `export * from './${answers.name}'`
        },
        () => {
          /* eslint-disable sonarjs/os-command -- it's safe */
          execSync(`pnpm prettier --write ${LINKS_CONFIG_PATH}`, {
            stdio: 'inherit'
          })

          execSync(`eslint --fix src/index.ts`, {
            stdio: 'inherit',
            cwd: 'packages/ui'
          })
          /* eslint-enable sonarjs/os-command -- enable them again */

          return 'Format the code successfully!'
        }
      )

      return actions
    }
  })
}
