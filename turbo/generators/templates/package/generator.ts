import { type PlopTypes } from '@turbo/gen'
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
        // Remove the last line break from package.json
        {
          type: 'modify',
          path: 'packages/{{ name }}/package.json',
          pattern: /\n$/,
          template: ''
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
          pattern: / {2}"ignore": \[(?<insertion>)/g,
          template: '    "@tszhong0411/{{ name }}",'
        })
      }

      if (answers?.shouldCompile) {
        // Add tsup configuration
        actions.push({
          type: 'add',
          path: 'packages/{{ name }}/tsup.config.ts',
          templateFile: 'templates/package/tsup.config.ts.hbs'
        })
      }

      // Install dependencies and format the code
      actions.push(() => {
        const packageName = (answers as { name: string }).name

        execSync('pnpm install', {
          stdio: 'inherit'
        })

        execSync(`pnpm prettier --write packages/${packageName}/**`, {
          stdio: 'inherit'
        })

        return `@tszhong0411/${packageName} is created successfully!`
      })

      return actions
    }
  })
}
