import { RawGraphQLAnime, Anime } from "@/models/Anime";

export function mapRawToAnime(raw: RawGraphQLAnime): Anime {
  return {
    id: raw.id,
    title: raw.title.english || raw.title.native,
    description: raw.description,
    coverUrl: raw.coverImage.extraLarge,
    year: raw.startDate.year,
    genres: raw.genres,
    status: raw.status,
    episodes: raw.episodes,
    popularity: raw.popularity,
  };
}
