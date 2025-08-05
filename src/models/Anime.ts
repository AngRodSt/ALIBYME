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

export interface RawGraphQLAnimeById {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  trailer?: {
    site: string;
    thumbnail: string;
    id: string;
  };
  relations: {
    edges: {
      relationType: string;
      node: {
        id: number;
        title: {
          userPreferred: string;
        };
        coverImage: {
          extraLarge: string;
        };
      };
    }[];
  };
  recommendations: {
    edges: {
      node: {
        mediaRecommendation: {
          id: number;
          title: {
            userPreferred: string;
          };
          coverImage: {
            extraLarge: string;
          };
        };
      };
    }[];
  };
  type: string;
  format: string;
  status: string;
  episodes: number;
  duration: number;
  season: string;
  seasonYear: number;
  countryOfOrigin: string;
  source: string;
  studios: {
    nodes: {
      name: string;
    }[];
  };
  volumes?: number;
  chapters?: number;
  coverImage: {
    extraLarge: string;
  };
  bannerImage: string;
  description: string;
  averageScore: number;
  genres: string[];
  tags: {
    name: string;
  }[];
  staff: {
    nodes: {
      name: {
        userPreferred: string;
      };
      age?: number;
      image: {
        medium: string;
      };
      dateOfBirth?: {
        year: number;
        month: number;
        day: number;
      };
      primaryOccupations: string[];
      staffMedia: {
        nodes: {
          id: number;
          title: {
            userPreferred: string;
          };
        }[];
      };
    }[];
  };
  characters: {
    nodes: {
      name: {
        userPreferred: string;
      };
      image: {
        large: string;
      };
    }[];
  };
}

export interface AnimeById extends Anime {
  // Basic info
  romaji?: string;
  native?: string;
  type?: string;
  format?: string;
  duration?: number;
  season?: string;
  seasonYear?: number;
  countryOfOrigin?: string;
  source?: string;

  // Media info
  volumes?: number;
  chapters?: number;
  bannerImage?: string;
  averageScore?: number;

  // Trailer
  trailer?: {
    site: string;
    thumbnail: string;
    id: string;
  };

  // Relations
  relations?: {
    type: string;
    anime: {
      id: number;
      title: string;
      coverUrl: string;
    };
  }[];

  // Recommendations
  recommendations?: {
    id: number;
    title: string;
    coverUrl: string;
  }[];

  // Studios
  studios?: string[];

  // Tags and genres
  tags?: string[];

  // Staff
  staff?: {
    name: string;
    age?: number;
    image?: string;
    dateOfBirth?: {
      year: number;
      month: number;
      day: number;
    };
    primaryOccupations: string[];
    recentWork?: {
      id: number;
      title: string;
    };
  }[];

  // Characters
  characters?: {
    name: string;
    image: string;
  }[];
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
