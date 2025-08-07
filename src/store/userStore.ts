import { create } from "zustand";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { Favorites, UserAnimeStatus } from "@/models/Anime";

interface UserProfile {
  id: string;
  user_name?: string;
  email?: string;
  preferences?: object;
  created_at?: string;
  updated_at?: string;
}

interface UserStoreState {
  user: User | null;
  userProfile: UserProfile | null;
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
  updateAnimeStatus: (
    animeId: number,
    status: UserAnimeStatus["status"],
    userId: string,
    supabase: SupabaseClient
  ) => Promise<void>;
  removeAnimeStatus: (
    animeId: number,
    userId: string,
    supabase: SupabaseClient
  ) => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  userProfile: null,
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
      else
        set({
          favorites: [],
          statuses: [],
          preferencesModal: false,
          userProfile: null,
        });
    });

    async function loadAll(userId: string) {
      const [{ data: userProfileData }, { data: f }, { data: s }] =
        await Promise.all([
          supabase.from("users").select("*").eq("id", userId).maybeSingle(),
          supabase.from("favorites").select("*").eq("user_id", userId),
          supabase
            .from("user_anime_status")
            .select("anime_id, status")
            .eq("user_id", userId),
        ]);
      set({
        userProfile: userProfileData,
        preferencesModal: !userProfileData?.preferences,
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

  updateAnimeStatus: async (
    animeId: number,
    status: UserAnimeStatus["status"],
    userId: string,
    supabase: SupabaseClient
  ) => {
    set((state) => {
      const exists = state.statuses.find((s) => s.anime_id === animeId);
      if (exists) {
        return {
          statuses: state.statuses.map((s) =>
            s.anime_id === animeId ? { ...s, status } : s
          ),
        };
      } else {
        return {
          statuses: [...state.statuses, { anime_id: animeId, status }],
        };
      }
    });

    await supabase.from("user_anime_status").upsert(
      {
        anime_id: animeId,
        user_id: userId,
        status,
        updated_at: new Date(),
      },
      { onConflict: "anime_id,user_id" }
    );
  },

  removeAnimeStatus: async (
    animeId: number,
    userId: string,
    supabase: SupabaseClient
  ) => {
    set((state) => ({
      statuses: state.statuses.filter((s) => s.anime_id !== animeId),
    }));
    await supabase
      .from("user_anime_status")
      .delete()
      .eq("anime_id", animeId)
      .eq("user_id", userId);
  },
}));
