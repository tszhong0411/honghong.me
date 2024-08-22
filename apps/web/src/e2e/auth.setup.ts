import { test as setup } from '@playwright/test'
import { accounts, db, sessions, users } from '@tszhong0411/db'
import dayjs from 'dayjs'
import path from 'node:path'

import { TEST_USER } from './constants'

const authenticatedStoragePath = path.resolve(import.meta.dirname, '.auth/user.json')
const unauthenticatedStoragePath = path.resolve(import.meta.dirname, '.auth/unauthenticated.json')

setup('unauthenticated', async ({ page }) => {
  await page.context().storageState({ path: unauthenticatedStoragePath })
})

setup('authenticate user', async ({ page }) => {
  const userId = TEST_USER.id
  const sessionToken = TEST_USER.sessionToken
  const expires = dayjs().add(1, 'month').toDate()

  await db
    .insert(users)
    .values({
      id: userId,
      name: 'Test User',
      email: 'user@honghong.me',
      image: 'http://localhost:3000/api/avatar/test',
      role: 'user'
    })
    .onConflictDoNothing({ target: users.id })

  await db
    .insert(sessions)
    .values({
      sessionToken,
      userId,
      expires
    })
    .onConflictDoUpdate({ target: sessions.sessionToken, set: { expires } })

  await db
    .insert(accounts)
    .values({
      userId,
      type: 'oauth',
      provider: 'github',
      providerAccountId: '00000000',
      access_token: 'gho_0000',
      token_type: 'bearer',
      scope: 'read:user,user:email'
    })
    .onConflictDoNothing({ target: [accounts.provider, accounts.providerAccountId] })

  await page.context().addCookies([
    {
      name: 'authjs.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(expires.getTime() / 1000)
    }
  ])

  await page.context().storageState({ path: authenticatedStoragePath })
})
