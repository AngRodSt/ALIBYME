export interface RawGraphQLAnime {
  id: number;
  title: { english: string; native: string };
  description: string;
  coverImage: { extraLarge: string };
  startDate?: { year: number };
  genres?: string[];
  status?: string;
  episodes?: number;
  popularity?: number;
}

export interface Anime {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  year?: number;
  genres?: string[];
  status?: string;
  episodes?: number;
  popularity?: number;
}

export interface UserAnimeStatus {
  anime_id: number;
  status: "watching" | "completed" | "dropped" | "plan to watch";
}

export interface Favorites {
  anime_id: number;
  user_id: string;
}

export interface RawGraphQLAnimeBasic {
  title: { english: string; native: string };
  bannerImage: string;
}

export interface RawGraphQLStudio {
  name: string;
  favourites: number;
  media: {
    nodes: RawGraphQLAnimeBasic[];
  };
}

export interface Studio {
  name: string;
  favorites: number;
  title: string;
  coverUrl: string;
}
