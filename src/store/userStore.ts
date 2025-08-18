import { create } from "zustand";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import {
  AnimeById,
  UserAnimeStatus,
  FavoriteWithAnime,
  UserAnimeStatusWithAnime,
  AnimeDBData,
} from "@/models/Anime";

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
  favorites: FavoriteWithAnime[];
  statuses: UserAnimeStatusWithAnime[];
  init: (supabase: SupabaseClient) => void;
  addFavorite: (
    anime: AnimeById,
    userId: string,
    supabase: SupabaseClient
  ) => Promise<void>;
  removeFavorite: (
    anime: AnimeById,
    userId: string,
    supabase: SupabaseClient
  ) => Promise<void>;
  updateAnimeStatus: (
    anime: AnimeById,
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
          supabase
            .from("favorites")
            .select(
              `
                anime_id,
                animes!inner (
                anime_id,
                title,
                coverUrl,
                year,
                genres,
                score,
                popularity
                )
              `
            )
            .eq("user_id", userId),
          supabase
            .from("user_anime_status")
            .select(
              `
              anime_id, 
              status,
              animes!inner (
                anime_id,
                title,
                coverUrl,
                year,
                genres,
                score,
                popularity
              )
            `
            )
            .eq("user_id", userId),
        ]);

      // Transform data to match expected types
      const transformedFavorites = (f || []).map((item) => ({
        anime_id: item.anime_id,
        animes: Array.isArray(item.animes) ? item.animes[0] : item.animes,
      })) as FavoriteWithAnime[];

      const transformedStatuses = (s || []).map((item) => ({
        anime_id: item.anime_id,
        status: item.status,
        animes: Array.isArray(item.animes) ? item.animes[0] : item.animes,
      })) as UserAnimeStatusWithAnime[];

      set({
        userProfile: userProfileData,
        preferencesModal: !userProfileData?.preferences,
        favorites: transformedFavorites,
        statuses: transformedStatuses,
      });
    }
  },

  addFavorite: async (
    anime: AnimeById,
    userId: string,
    supabase: SupabaseClient
  ) => {
    //Verify if the anime already exist in the database or need to be added
    const animeE = await addAnimeToDatabase(anime, supabase);
    if (!animeE) {
      console.log("Anime not found in database:", anime.id);
      return;
    }

    // Create the new favorite with anime data
    const newFavorite: FavoriteWithAnime = {
      anime_id: anime.id,
      animes: {
        anime_id: animeE.anime_id,
        title: animeE.title,
        coverUrl: animeE.coverUrl,
        year: animeE.year,
        genres: animeE.genres,
        score: animeE.score,
        popularity: animeE.popularity,
      },
    };

    set((state) => ({
      favorites: [...state.favorites, newFavorite],
    }));

    await supabase
      .from("favorites")
      .insert({ anime_id: anime.id, user_id: userId });
  },
  removeFavorite: async (
    anime: AnimeById,
    userId: string,
    supabase: SupabaseClient
  ) => {
    set((state) => ({
      favorites: state.favorites.filter((f) => f.anime_id !== anime.id),
    }));
    await supabase
      .from("favorites")
      .delete()
      .eq("anime_id", anime.id)
      .eq("user_id", userId);
  },

  updateAnimeStatus: async (
    anime: AnimeById,
    status: UserAnimeStatus["status"],
    userId: string,
    supabase: SupabaseClient
  ) => {
    const animeE = await addAnimeToDatabase(anime, supabase);
    if (!animeE) {
      console.log("Anime not found in database:", anime.id);
      return;
    }

    set((state) => {
      const exists = state.statuses.find((s) => s.anime_id === anime.id);
      const animeData: AnimeDBData = {
        anime_id: animeE.anime_id,
        title: animeE.title,
        coverUrl: animeE.coverUrl,
        year: animeE.year,
        genres: animeE.genres,
        score: animeE.score,
        popularity: animeE.popularity,
      };

      if (exists) {
        return {
          statuses: state.statuses.map((s) =>
            s.anime_id === anime.id ? { ...s, status, animes: animeData } : s
          ),
        };
      } else {
        return {
          statuses: [
            ...state.statuses,
            { anime_id: anime.id, status, animes: animeData },
          ],
        };
      }
    });

    await supabase.from("user_anime_status").upsert(
      {
        anime_id: anime.id,
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

// Add anime to database so access data will be easier and faster
async function addAnimeToDatabase(anime: AnimeById, supabase: SupabaseClient) {
  const { data: existingAnime, error } = await supabase
    .from("animes")
    .select("*")
    .eq("anime_id", anime.id)
    .maybeSingle();

  if (error) {
    console.error("Error checking for existing anime:", error);
    return;
  }

  if (existingAnime) {
    console.log("Anime already exists in database:", existingAnime);
    return existingAnime;
  }

  const { data: newAnime, error: insertError } = await supabase
    .from("animes")
    .insert({
      anime_id: anime.id,
      title: anime.title,
      coverUrl: anime.coverUrl,
      year: anime.year || anime.seasonYear,
      genres: anime.genres,
      popularity: anime.popularity,
      score: anime.averageScore,
    })
    .select()
    .maybeSingle();

  if (insertError) {
    console.error("Error adding anime to database:", insertError);
    return null;
  }
  return newAnime;
}
