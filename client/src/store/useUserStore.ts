import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  username: string | null;
  email: string | null;
  userId: string | null;
  setAuth: (username: string, email: string, id: string) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      email: null,
      userId: null,

      setAuth: (username, email, id) => set({ username, email, userId: id }),
      
      clearAuth: () => {
        set({ username: null, email:null, userId: null });
        localStorage.removeItem('user-session'); 
      },
    }),
    { name: 'user-session' }
  )
);