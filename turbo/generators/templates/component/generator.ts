import type { PlopTypes } from '@turbo/gen'

import { execSync } from 'node:child_process'

import { Project, type PropertyAssignment, SyntaxKind } from 'ts-morph'

import { titleCase } from '../../utils'

const LINKS_CONFIG_PATH = 'apps/docs/src/config/links.ts'

export const componentGenerator = (plop: PlopTypes.NodePlopAPI): void => {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
        // eslint-disable-next-line sonarjs/function-return-type -- boolean or string is expected
        validate: (input: string) => {
          if (input.trim().length === 0) {
            return 'Component name is required.'
          }

          if (input !== input.toLowerCase()) {
            return 'Component name should be in lowercase.'
          }

          if (input.includes(' ')) {
            return 'Component name should not contain spaces.'
          }

          return true
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of the component?',
        validate: (input: string) => {
          if (input.trim().length === 0) {
            return 'Description is required.'
          }

          return true
        }
      }
    ],
    actions: (answers) => [
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
        path: 'apps/docs/src/content/ui/{{ name }}.mdx',
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
            .map((obj) => {
              const href = (obj.getProperty('href') as PropertyAssignment)
                .getInitializer()!
                .getText()
              const text = (obj.getProperty('text') as PropertyAssignment)
                .getInitializer()!
                .getText()
              const isArkUI = obj.getProperty('isArkUI') as PropertyAssignment | undefined

              return {
                href,
                text,
                ...(isArkUI && { isArkUI: isArkUI.getInitializer()!.getText() })
              }
            })

          elements.push({
            href: `'/ui/${name}'`,
            text: `'${titleCase(name)}'`
          })

          elements.sort((a, b) => a.text.localeCompare(b.text))

          for (let i = initializer.getElements().length - 1; i >= 0; i--) {
            initializer.removeElement(i)
          }
          for (const element of elements) {
            initializer.addElement(`{
                href: ${element.href},
                text: ${element.text}${
                  element.isArkUI
                    ? `,
                isArkUI: ${element.isArkUI}`
                    : ''
                }
              }`)
          }

          await sourceFile.save()

          return `Modify links.ts successfully!`
        } catch {
          throw new Error('Failed to modify links.ts')
        }
      },
      // Update the index.ts file in UI package
      {
        type: 'append',
        path: 'packages/ui/src/index.ts',
        template: `export * from './${(answers as { name: string }).name}'`
      },
      // Format and lint the code
      () => {
        /* eslint-disable sonarjs/os-command -- it's safe */
        execSync(`pnpm prettier --write ${LINKS_CONFIG_PATH}`, {
          stdio: 'inherit'
        })

        execSync(`eslint --fix src/index.ts`, {
          stdio: 'inherit',
          cwd: 'packages/ui'
        })
        /* eslint-enable sonarjs/os-command -- enable it again */

        return 'Format the code successfully!'
      }
    ]
  })
}
