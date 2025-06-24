import path from 'node:path'

import { test as setup } from '@playwright/test'
import { accounts, db, sessions, users } from '@tszhong0411/db'
import { env } from '@tszhong0411/env'
import { generateId } from 'better-auth'
import { serializeSignedCookie } from 'better-call'
import dayjs from 'dayjs'

import { TEST_USER } from '../constants'

const authenticatedStoragePath = path.resolve(import.meta.dirname, '../.auth/user.json')
const unauthenticatedStoragePath = path.resolve(
  import.meta.dirname,
  '../.auth/unauthenticated.json'
)

setup('setup unauthenticated', async ({ page }) => {
  await page.context().storageState({ path: unauthenticatedStoragePath })
})

setup('setup authenticated', async ({ page }) => {
  const expiresAt = dayjs().add(7, 'day').toDate()

  await db.transaction(async (tx) => {
    await tx
      .insert(users)
      .values({
        id: TEST_USER.id,
        name: TEST_USER.name,
        email: TEST_USER.email,
        image: TEST_USER.image,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .onConflictDoNothing({ target: users.id })

    await tx
      .insert(accounts)
      .values({
        id: generateId(),
        accountId: TEST_USER.accountId,
        providerId: 'github',
        userId: TEST_USER.id,
        accessToken: 'gho_1234567890',
        scope: 'read:user,user:email',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .onConflictDoNothing({ target: accounts.id })

    await tx
      .insert(sessions)
      .values({
        id: generateId(),
        token: TEST_USER.sessionToken,
        userId: TEST_USER.id,
        expiresAt: expiresAt,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .onConflictDoUpdate({
        target: sessions.token,
        set: { expiresAt: expiresAt }
      })
  })

  const cookie = await serializeSignedCookie(
    'better-auth.session_token',
    TEST_USER.sessionToken,
    env.BETTER_AUTH_SECRET
  )

  await page.context().addCookies([
    {
      name: 'better-auth.session_token',
      value: `${TEST_USER.sessionToken}.${cookie.split('.')[2]!}`,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(expiresAt.valueOf() / 1000)
    }
  ])

  await page.goto('http://localhost:3000/')
  await page.waitForLoadState('domcontentloaded')

  await page.context().storageState({ path: authenticatedStoragePath })
})
