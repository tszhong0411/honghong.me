import { atom } from 'nanostores'

type DialogsState = {
  signIn: boolean
}

export const dialogs = atom<DialogsState>({
  signIn: false
})

export const setDialogs = (value: DialogsState) => {
  dialogs.set({ ...dialogs.get(), ...value })
}
