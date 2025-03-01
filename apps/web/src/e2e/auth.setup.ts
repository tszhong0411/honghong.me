import path from 'node:path'

import { test as setup } from '@playwright/test'
import { accounts, db, sessions, users } from '@tszhong0411/db'
import { generateId } from 'better-auth'
import dayjs from 'dayjs'

import { TEST_USER } from './constants'

const authenticatedStoragePath = path.resolve(import.meta.dirname, '.auth/user.json')
const unauthenticatedStoragePath = path.resolve(import.meta.dirname, '.auth/unauthenticated.json')

setup('unauthenticated', async ({ page }) => {
  await page.context().storageState({ path: unauthenticatedStoragePath })
})

setup('authenticate user', async ({ page }) => {
  const { id: userId, token, accountId } = TEST_USER
  const expiresAt = dayjs().add(1, 'month').toDate()

  await db
    .insert(users)
    .values({
      id: userId,
      name: 'Test User',
      email: 'user@honghong.me',
      emailVerified: true,
      image: 'http://localhost:3000/api/avatar/test',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user'
    })
    .onConflictDoNothing({ target: users.id })

  await db
    .insert(sessions)
    .values({
      id: generateId(),
      token,
      userId,
      expiresAt,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .onConflictDoUpdate({ target: sessions.token, set: { expiresAt } })

  await db
    .insert(accounts)
    .values({
      id: generateId(),
      accountId,
      providerId: 'github',
      userId,
      accessToken: 'gho_0000',
      scope: 'read:user,user:email',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .onConflictDoNothing({ target: [accounts.id] })

  await page.context().addCookies([
    {
      name: 'better-auth.session_token',
      value: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(expiresAt.getTime() / 1000)
    }
  ])

  await page.context().storageState({ path: authenticatedStoragePath })
})
