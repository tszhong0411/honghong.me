import { create } from 'zustand'

type DialogsStore = {
  isSignInOpen: boolean
  setIsSignInOpen: (value: boolean) => void
}

export const useDialogsStore = create<DialogsStore>((set) => ({
  isSignInOpen: false,
  setIsSignInOpen: (isSignInOpen) => set({ isSignInOpen })
}))
