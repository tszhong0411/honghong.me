import type { PlopTypes } from '@turbo/gen'

import { execSync } from 'node:child_process'

export const packageGenerator = (plop: PlopTypes.NodePlopAPI): void => {
  plop.setGenerator('package', {
    description: 'Create a new package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the package (without scope)?',
        validate: (input: string) => {
          if (!/^[\da-z-]+$/.test(input)) {
            return 'Package name can only contain lowercase letters, numbers and dashes.'
          }

          return true
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of the package?',
        validate: (input: string) => {
          if (input.trim().length === 0) {
            return 'Description is required.'
          }

          return true
        }
      },
      {
        type: 'input',
        name: 'version',
        message: 'What is the initial version of the package?',
        default: '0.0.0',
        validate: (input: string) => {
          if (!/^\d+\.\d+\.\d+$/.test(input)) {
            return 'Version should be in the format of x.y.z.'
          }

          return true
        }
      },
      {
        type: 'confirm',
        name: 'isReactPackage',
        message: 'Is this a React package?',
        default: false
      },
      {
        type: 'confirm',
        name: 'shouldPublish',
        message: 'Will it be published on npm registry?',
        default: false
      },
      {
        type: 'confirm',
        name: 'shouldCompile',
        message: 'Do you need to compile the package?',
        default: false
      },
      {
        type: 'checkbox',
        name: 'enabledESLintRuleSets',
        choices: ['react', 'next', 'playwright', 'testingLibrary']
      },
      {
        type: 'confirm',
        name: 'shouldRunInWeb',
        message: 'Should the package run in web environment?',
        default: false
      }
    ],
    actions: (answers) => {
      const actions: PlopTypes.Actions = [
        // Add package.json
        {
          type: 'add',
          path: 'packages/{{ name }}/package.json',
          templateFile: 'templates/package/package.json.hbs'
        },
        // Add ESLint configuration
        {
          type: 'add',
          path: 'packages/{{ name }}/eslint.config.mjs',
          templateFile: 'templates/package/eslint.config.mjs.hbs'
        },
        // Add tsconfig.json
        {
          type: 'add',
          path: 'packages/{{ name }}/tsconfig.json',
          templateFile: 'templates/package/tsconfig.json.hbs'
        },
        // Add index.ts
        {
          type: 'add',
          path: 'packages/{{ name }}/src/index.ts',
          template: "console.log('Hello, world!')"
        }
      ]

      if (!answers?.shouldPublish) {
        // Append the package to ignore list in changesets' configuration
        actions.push({
          type: 'append',
          path: '.changeset/config.json',
          pattern: / {2}"ignore": \[/g,
          template: '    "@tszhong0411/{{ name }}",'
        })
      }

      if (answers?.shouldCompile) {
        actions.push(
          // Add rslib configuration
          {
            type: 'add',
            path: 'packages/{{ name }}/rslib.config.ts',
            templateFile: 'templates/package/rslib.config.ts.hbs'
          },
          // Add tsconfig.build.json
          {
            type: 'add',
            path: 'packages/{{ name }}/tsconfig.build.json',
            templateFile: 'templates/package/tsconfig.build.json.hbs'
          }
        )
      }

      // Install dependencies and format the code
      actions.push(() => {
        if (!answers?.name) throw new Error('Package name is required')

        const packageName = answers.name

        /* eslint-disable sonarjs/no-os-command-from-path, sonarjs/os-command -- it's safe */
        execSync('pnpm install', {
          stdio: 'inherit'
        })

        execSync(`pnpm prettier --write packages/${packageName}/**`, {
          stdio: 'inherit'
        })
        /* eslint-enable sonarjs/no-os-command-from-path, sonarjs/os-command -- enable them again */

        return `@tszhong0411/${packageName} is created successfully!`
      })

      return actions
    }
  })
}
