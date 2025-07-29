import { create } from "zustand";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { Favorites, UserAnimeStatus } from "@/models/Anime";

interface UserStoreState {
  user: User | null;
  preferencesModal: boolean;
  setPreferencesModal: (v: boolean) => void;
  favorites: Favorites[];
  statuses: UserAnimeStatus[];
  init: (supabase: SupabaseClient) => void;
  addFavorite: (
    animeId: number,
    userId: string,
    supabase: SupabaseClient
  ) => Promise<void>;
  removeFavorite: (
    animeId: number,
    userId: string,
    supabase: SupabaseClient
  ) => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  preferencesModal: false,
  setPreferencesModal: (v) =>
    set((state) => {
      if (state.preferencesModal === v) return {};
      return { preferencesModal: v };
    }),
  favorites: [],
  statuses: [],

  init: (supabase) => {
    supabase.auth.getUser().then(({ data }) => {
      set({ user: data.user });
      if (data.user) {
        loadAll(data.user.id);
      }
    });
    supabase.auth.onAuthStateChange((_, session) => {
      const u = session?.user || null;
      set({ user: u });
      if (u) loadAll(u.id);
      else set({ favorites: [], statuses: [], preferencesModal: false });
    });

    async function loadAll(userId: string) {
      const [{ data: p }, { data: f }, { data: s }] = await Promise.all([
        supabase
          .from("users")
          .select("preferences")
          .eq("id", userId)
          .maybeSingle(),
        supabase.from("favorites").select("*").eq("user_id", userId),
        supabase
          .from("user_anime_status")
          .select("anime_id, status")
          .eq("user_id", userId),
      ]);
      set({
        preferencesModal: !p?.preferences,
        favorites: f || [],
        statuses: s || [],
      });
    }
  },

  addFavorite: async (
    animeId: number,
    userId: string,
    supabase: SupabaseClient
  ) => {
    set((state) => ({
      favorites: [...state.favorites, { anime_id: animeId, user_id: userId }],
    }));
    await supabase
      .from("favorites")
      .insert({ anime_id: animeId, user_id: userId });
  },
  removeFavorite: async (
    animeId: number,
    userId: string,
    supabase: SupabaseClient
  ) => {
    set((state) => ({
      favorites: state.favorites.filter((f) => f.anime_id !== animeId),
    }));
    await supabase
      .from("favorites")
      .delete()
      .eq("anime_id", animeId)
      .eq("user_id", userId);
  },
}));
