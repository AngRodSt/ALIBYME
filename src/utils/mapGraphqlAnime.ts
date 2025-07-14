import {
  RawGraphQLAnime,
  Anime,
  RawGraphQLStudio,
  Studio,
} from "@/models/Anime";

export function mapRawToAnime(raw: RawGraphQLAnime): Anime {
  return {
    id: raw.id,
    title: raw.title.english || raw.title.native,
    description: raw.description,
    coverUrl: raw.coverImage.extraLarge,
    year: raw.startDate?.year,
    genres: raw.genres,
    status: raw.status,
    episodes: raw.episodes,
    popularity: raw.popularity,
  };
}

export function mapRawToStudio(row: RawGraphQLStudio): Studio {
  return {
    name: row.name,
    favorites: row.favourites,
    title: row.media.nodes[0].title.english || row.media.nodes[0].title.native,
    coverUrl: row.media.nodes[0].bannerImage,
  };
}
