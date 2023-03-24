import { DefaultSession } from 'next-auth'
import React from 'react'

import Form from './form'
import Messages from './messages'
import SignIn from './sign-in'

type GuestbookProps = {
  user: DefaultSession['user']
}

const Guestbook = (props: GuestbookProps) => {
  const { user } = props

  return (
    <div className='mx-auto max-w-lg'>
      {!user && <SignIn />}
      {user && <Form user={user} />}
      <Messages user={user} />
    </div>
  )
}

export default Guestbook
