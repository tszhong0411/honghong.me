import { create } from 'zustand'

type SignInModalStore = {
  open: boolean
  setOpen: (value: boolean) => void
}

export const useSignInModalStore = create<SignInModalStore>()((set) => ({
  open: false,
  setOpen: (value) => {
    set({ open: value })
  }
}))
