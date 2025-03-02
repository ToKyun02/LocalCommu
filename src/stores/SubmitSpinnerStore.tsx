import { create } from 'zustand';

interface SubmitSpinnerStore {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useSubmitSpinnerStore = create<SubmitSpinnerStore>((set) => ({
  isVisible: false,
  setVisible: (visible) => set(() => ({ isVisible: visible })),
}));
