import { test as teardown } from '@playwright/test'
import { db, eq, users } from '@tszhong0411/db'

import { TEST_USER } from '../constants'

teardown('teardown auth', async () => {
  await db.delete(users).where(eq(users.id, TEST_USER.id))
})
