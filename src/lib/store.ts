import create from 'zustand';

import { useModalType } from '@/components/Modal/types';

export const useModal = create<useModalType>((set) => ({
  status: false,
  title: '',
  message: '',
  children: undefined,
  setValue: ({ status, title, message, children }) =>
    set({ status, title, message, children }),
}));
