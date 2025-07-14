import { createWithEqualityFn } from 'zustand/traditional';

const useUserStore = createWithEqualityFn((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
