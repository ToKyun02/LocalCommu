import { create } from 'zustand';

interface Toast {
  message: string;
  type?: 'info' | 'success' | 'error';
}

interface ToastState {
  toastList: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toastList: [],
  addToast: ({ message, type = 'info' }) => {
    set((state) => ({
      toastList: [...state.toastList, { message, type }],
    }));
    setTimeout(() => {
      set((state) => ({ toastList: state.toastList.slice(1) }));
    }, 2000);
  },
  removeToast: () => {
    set((state) => ({ toastList: state.toastList.slice(1) }));
  },
}));
