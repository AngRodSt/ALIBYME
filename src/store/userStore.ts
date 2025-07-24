import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

interface UserStoreState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
