import {
  RawGraphQLAnime,
  Anime,
  RawGraphQLStudio,
  Studio,
  RawGraphQLAnimeById,
  AnimeById,
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

// Función de mapeo para convertir RawGraphQLAnimeById a AnimeById
export function mapRawAnimeById(raw: RawGraphQLAnimeById): AnimeById {
  return {
    id: raw.id,
    title: raw.title.english || raw.title.native,
    romaji: raw.title.romaji,
    native: raw.title.native,
    description: raw.description,
    coverUrl: raw.coverImage.extraLarge,
    bannerImage: raw.bannerImage,
    type: raw.type,
    format: raw.format,
    status: raw.status,
    episodes: raw.episodes,
    duration: raw.duration,
    season: raw.season,
    seasonYear: raw.seasonYear,
    countryOfOrigin: raw.countryOfOrigin,
    source: raw.source,
    volumes: raw.volumes,
    chapters: raw.chapters,
    averageScore: raw.averageScore,
    genres: raw.genres,
    tags: raw.tags?.map((tag) => tag.name) || [],
    studios: raw.studios?.nodes?.map((studio) => studio.name) || [],
    // Trailer
    trailer: raw.trailer,
    // Relations - mapear como objetos Anime completos
    relations:
      raw.relations?.edges?.map((edge) => ({
        type: edge.relationType,
        anime: [
          {
            id: edge.node.id,
            title: edge.node.title.english || edge.node.title.native,
            description: edge.node.description,
            coverUrl: edge.node.coverImage.extraLarge,
            year: edge.node.startDate?.year,
            genres: edge.node.genres,
            status: edge.node.status,
            episodes: edge.node.episodes,
            popularity: edge.node.popularity,
          },
        ],
      })) || [],
    // Recommendations - mapear como objetos Anime completos
    recommendations:
      raw.recommendations?.edges?.map((edge) => ({
        id: edge.node.mediaRecommendation.id,
        title:
          edge.node.mediaRecommendation.title.english ||
          edge.node.mediaRecommendation.title.native,
        description: edge.node.mediaRecommendation.description,
        coverUrl: edge.node.mediaRecommendation.coverImage.extraLarge,
        year: edge.node.mediaRecommendation.startDate?.year,
        genres: edge.node.mediaRecommendation.genres,
        status: edge.node.mediaRecommendation.status,
        episodes: edge.node.mediaRecommendation.episodes,
        popularity: edge.node.mediaRecommendation.popularity,
      })) || [],
    staff:
      raw.staff?.nodes?.map((staffMember) => ({
        name: staffMember.name.userPreferred,
        age: staffMember.age,
        image: staffMember.image.medium,
        dateOfBirth: staffMember.dateOfBirth,
        primaryOccupations: staffMember.primaryOccupations,
        recentWork: staffMember.staffMedia?.nodes?.[0]
          ? {
              id: staffMember.staffMedia.nodes[0].id,
              title: staffMember.staffMedia.nodes[0].title.userPreferred,
            }
          : undefined,
      })) || [],
    characters:
      raw.characters?.nodes?.map((character) => ({
        name: character.name.userPreferred,
        image: character.image.large,
      })) || [],
  };
}
