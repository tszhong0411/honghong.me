# AI Agent Guide for nelsonlai.me

This document provides comprehensive guidance for OpenAI Codex and other AI agents working with the nelsonlai.me codebase. It serves as a knowledge base to help AI understand our project structure, conventions, and requirements.

## Project Overview

nelsonlai.me is a Next.js monorepo containing a personal website, documentation site, and shared packages. The project uses TypeScript, React, and modern web development best practices.

## Project Structure for AI Navigation

```
nelsonlai-me/
├── apps/                   # Application workspaces
│   ├── docs/               # Documentation site (Next.js)
│   └── web/                # Main website (Next.js)
├── packages/               # Shared packages
│   ├── db/                 # Database schema and migrations (Drizzle ORM)
│   ├── ui/                 # Shared UI components library
│   ├── emails/             # Email templates (React Email)
│   ├── i18n/               # Internationalization
│   ├── mdx-plugins/        # MDX processing plugins
│   ├── kv/                 # Key-value store utilities
│   ├── env/                # Environment variable management
│   ├── shared/             # Shared utilities
│   ├── utils/              # Common utility functions
│   ├── eslint-config/      # ESLint configuration
│   ├── prettier-config/    # Prettier configuration
│   └── tsconfig/           # TypeScript configurations
└── turbo/                  # Turborepo generators
```

### Key Directories AI Should Understand

- **`apps/web/src`**: Main website source code

  - `/app`: Next.js App Router pages and layouts
  - `/components`: React components
  - `/trpc`: tRPC API routes and routers
  - `/lib`: Core utilities and configurations
  - `/hooks`: Custom React hooks
  - `/store`: State management (Zustand)

- **`apps/docs/src`**: Documentation site source

  - `/content`: MDX documentation files
  - `/components`: Documentation-specific components

- **`packages/db/src`**: Database layer
  - `/schema`: Drizzle ORM schema definitions
  - `/migrations`: Database migration files

## Technology Stack

### Core Technologies

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom utility classes
- **Database**: PostgreSQL with Drizzle ORM
- **Cache**: Redis for caching and rate limiting
- **Authentication**: Better Auth
- **API**: tRPC for type-safe APIs
- **Email**: React Email for transactional emails
- **Testing**: Playwright for E2E, Vitest for unit tests
- **Package Manager**: pnpm (v10+)
- **Monorepo**: Turborepo

### Content Management

- **MDX**: For blog posts and documentation
- **Content Collections**: For structured content

## Coding Conventions for AI Agents

### TypeScript Guidelines

- Always use arrow functions
- Use const assertions for constants
- Avoid destructuring props directly in the parameter signature
- Avoid using interface for type definitions
- Avoid any types

### File Naming Conventions

- **Files**: kebab-case for everything (e.g., `use-debounce.ts`, `dropdown-menu.tsx`)
- **Constants**: UPPER_SNAKE_CASE in files (e.g., `API_ENDPOINTS`)

### Component Structure

```typescript
// 1. Type definitions
type ComponentProps {
  // ...
}

// 2. Component definition
const Component = (props: ComponentProps) => {
  const { className, ...rest } = props

  // 3. Hooks
  const [state, setState] = useState()

  // 4. Event handlers
  const handleClick = () => {
    // ...
  }

  // 5. Render
  return (
    <div className={className} {...rest}>
      {/* Content */}
    </div>
  )
}

// 6. Export
export default Component
```

### Styling Conventions

- Use Tailwind CSS utilities
- Use `cn()` helper from `@tszhong0411/utils` for conditional classes
- Prefer `space-x-*` and `space-y-*` over `mb-*` and `mt-*`
- Prefer `gap-*` over `space-x-*` and `space-y-*` in flex containers
- Avoid inline styles unless dynamic
- Follow mobile-first responsive design

```tsx
// ✅ Good
<div className={cn('flex items-center gap-4', isActive && 'bg-accent')}>

// ❌ Avoid
<div style={{ display: 'flex', gap: '1rem' }}>
```

## Testing Requirements

### Running Tests

```bash
# Run all tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Run unit tests
pnpm test:unit
```

### Test File Conventions

- Unit tests: `*.test.ts` or `*.test.tsx`
- E2E tests: Located in `src/e2e/` directory
- Test utilities: Located in `src/tests/` directory

### Writing Tests

```typescript
// Unit test example
import { describe, it, expect } from 'vitest'

describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  })
})

// E2E test example
import { test, expect } from '@playwright/test'

test('page loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Nelson Lai/)
})
```

## Database Operations

### Schema Modifications

When modifying database schema:

1. Edit schema files in `packages/db/src/schema/`
2. Generate migration: `pnpm db:generate`
3. Apply migration: `pnpm db:migrate`
4. Update types if needed

### Database Commands

```bash
# Generate migration
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Open Drizzle Studio
pnpm db:studio
```

## API Development (tRPC)

### Creating New Routes

```typescript
// In apps/web/src/trpc/routers/example.ts
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../init'

export const exampleRouter = createTRPCRouter({
  // Public endpoint
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(table)
  }),

  // Protected endpoint
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Implementation
    })
})
```

## Environment Variables

### Setup

1. Copy `.env.example` to `.env.local`
2. Fill in required variables (for testing, use fake values, see `.github/actions/setup/action.yml`)
3. Use `packages/env` for type-safe access

### Feature Flags

Enable features by setting these in `.env.local`:

- `NEXT_PUBLIC_FLAG_COMMENT`: Enable comments
- `NEXT_PUBLIC_FLAG_AUTH`: Enable authentication
- `NEXT_PUBLIC_FLAG_STATS`: Enable dashboard
- `NEXT_PUBLIC_FLAG_SPOTIFY`: Enable Spotify integration
- `NEXT_PUBLIC_FLAG_ANALYTICS`: Enable analytics
- `NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION`: Enable notifications
- `NEXT_PUBLIC_FLAG_LIKE_BUTTON`: Enable like buttons

## Pull Request Guidelines

### PR Title Format

Follow Conventional Commits:

```
feat(scope): add new feature
fix(scope): resolve issue
docs(scope): update documentation
style(scope): formatting changes
refactor(scope): code improvements
test(scope): add tests
chore(scope): maintenance tasks
```

### PR Checklist

Before submitting:

1. ✅ Run `pnpm check` (includes lint, type-check, format)
2. ✅ Run `pnpm test` for affected packages
3. ✅ Update documentation if needed
4. ✅ Add/update tests for new features
5. ✅ Ensure no console errors
6. ✅ Test on mobile viewport
7. ✅ Check accessibility (keyboard navigation, screen readers)

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Tested on multiple browsers
```

## Development Commands

### Essential Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev          # Run all apps
pnpm dev:web      # Run web app only
pnpm dev:docs     # Run docs app only

# Building
pnpm build        # Build all apps
pnpm build:web    # Build web app
pnpm build:docs   # Build docs app

# Quality Checks
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Check Prettier formatting
pnpm format:fix   # Fix formatting
pnpm typecheck    # Run TypeScript checks
pnpm check        # Run all checks

# Database
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Apply migrations
pnpm db:seed      # Seed database
pnpm db:studio    # Open Drizzle Studio

# Testing
pnpm test         # Run all tests
pnpm test:e2e     # Run E2E tests
pnpm test:unit    # Run unit tests
```

### Turbo Commands

```bash
# Generate new component
pnpm gen component

# Generate new package
pnpm gen package

# Generate new blog post
pnpm gen post
```

## Common Patterns

### Data Fetching

```typescript
// Server Component
const ServerComponent = async () => {
  const data = await db.select().from(table)
  return <div>{/* Render data */}</div>
}

// Client Component with tRPC (preferred)
const ClientComponent = () => {
  const { data } = api.example.getAll.useQuery()
  return <div>{/* Render data */}</div>
}
```

### Error Handling

```typescript
// Use error boundaries for UI errors
// Use tRPC error handling for API errors
// Log errors appropriately
```

### Performance Optimization

- Use Next.js Image component for images
- Implement proper loading states
- Use React.Suspense for code splitting
- Optimize bundle size with dynamic imports (last resort)

## Accessibility Requirements

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Provide proper ARIA labels where needed
- Ensure sufficient color contrast (WCAG AA)
- Test with screen readers

## Security Considerations

- Validate all user inputs (use Zod schemas)
- Sanitize data before rendering
- Use CSRF protection (built into Better Auth)
- Implement rate limiting for APIs
- Never expose sensitive data in client code

## Deployment

The project uses automated deployment:

- Main branch deploys to production
- Pull requests create preview deployments
- Environment variables are managed in deployment platform

## Getting Help

- Check existing issues before creating new ones
- Provide reproduction steps for bugs
- Include relevant error messages and logs
- Reference specific files and line numbers when applicable
