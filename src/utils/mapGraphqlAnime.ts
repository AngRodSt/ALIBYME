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
      raw.relations?.edges
        ?.filter((edge) => edge.node) // Filter out null/undefined nodes
        ?.map((edge) => ({
          type: edge.relationType || "UNKNOWN",
          anime: [
            {
              id: edge.node.id || 0,
              title:
                edge.node.title?.english ||
                edge.node.title?.native ||
                "Unknown Title",
              description: edge.node.description || "",
              coverUrl: edge.node.coverImage?.extraLarge || "",
              year: edge.node.startDate?.year || undefined,
              genres: edge.node.genres || [],
              status: edge.node.status || undefined,
              episodes: edge.node.episodes || undefined,
              popularity: edge.node.popularity || undefined,
            },
          ],
        })) || [],
    // Recommendations - mapear como objetos Anime completos
    recommendations:
      raw.recommendations?.edges
        ?.filter((edge) => edge.node?.mediaRecommendation) // Filter out null/undefined recommendations
        ?.map((edge) => {
          const rec = edge.node.mediaRecommendation;
          return {
            id: rec.id || 0,
            title: rec.title?.english || rec.title?.native || "Unknown Title",
            description: rec.description || "",
            coverUrl: rec.coverImage?.extraLarge || "",
            year: rec.startDate?.year || undefined,
            genres: rec.genres || [],
            status: rec.status || undefined,
            episodes: rec.episodes || undefined,
            popularity: rec.popularity || undefined,
          };
        }) || [],
    staff:
      raw.staff?.nodes
        ?.filter((staffMember) => staffMember) // Filter out null/undefined staff members
        ?.map((staffMember) => ({
          name: staffMember.name?.userPreferred || "Unknown Staff",
          age: staffMember.age || undefined,
          image: staffMember.image?.medium || "",
          dateOfBirth: staffMember.dateOfBirth || undefined,
          primaryOccupations: staffMember.primaryOccupations || [],
          recentWork: staffMember.staffMedia?.nodes?.[0]
            ? {
                id: staffMember.staffMedia.nodes[0].id || 0,
                title:
                  staffMember.staffMedia.nodes[0].title?.userPreferred ||
                  "Unknown Title",
              }
            : undefined,
        })) || [],
    characters:
      raw.characters?.nodes
        ?.filter((character) => character) // Filter out null/undefined characters
        ?.map((character) => ({
          name: character.name?.userPreferred || "Unknown Character",
          image: character.image?.large || "",
        })) || [],
  };
}
