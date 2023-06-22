import { DefaultSession } from 'next-auth'

import Form from './form'
import Messages from './messages'
import Pinned from './pinned'
import SignIn from './sign-in'

type GuestbookProps = {
  user: DefaultSession['user']
}

const Guestbook = (props: GuestbookProps) => {
  const { user } = props

  return (
    <div className='mx-auto max-w-lg'>
      <Pinned />
      {!user && <SignIn />}
      {user && <Form user={user} />}
      <Messages user={user} />
    </div>
  )
}

export default Guestbook
