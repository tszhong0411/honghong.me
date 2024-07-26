import { atom } from 'nanostores'

type ModelsState = {
  signIn: boolean
}

export const modals = atom<ModelsState>({
  signIn: false
})

export const setModals = (value: ModelsState) => {
  modals.set({ ...modals.get(), ...value })
}
