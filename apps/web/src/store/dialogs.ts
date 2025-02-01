import { atom } from 'jotai'

type Dialogs = {
  signIn: boolean
}

export const dialogsAtom = atom<Dialogs>({
  signIn: false
})
