import { graphqlClient } from "./graphqlClient";
import {
  trendingQuery,
  topAnimeQuery,
  popularQuery,
  lastReleases,
  studios,
} from "@/gql/queries";
import {
  Anime,
  RawGraphQLAnime,
  RawGraphQLStudio,
  Studio,
} from "@/models/Anime";
import { mapRawToAnime, mapRawToStudio } from "@/utils/mapGraphqlAnime";

export async function getTopAnime(): Promise<Anime | null> {
  try {
    const { Page } = await graphqlClient.request<{
      Page: { media: RawGraphQLAnime[] };
    }>(topAnimeQuery);

    const anime = Page.media[0];
    return anime ? mapRawToAnime(anime) : null;
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return null;
  }
}

export async function getTrendingAnime(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  const { Page } = await graphqlClient.request<{
    Page: { media: RawGraphQLAnime[] };
  }>(trendingQuery, { page, perPage });
  return Page.media.map(mapRawToAnime);
}

export async function getPopularAnime(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  const { Page } = await graphqlClient.request<{
    Page: { media: RawGraphQLAnime[] };
  }>(popularQuery, { page, perPage });

  return Page.media.map(mapRawToAnime);
}

export async function getLastReleases(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  const { Page } = await graphqlClient.request<{
    Page: { media: RawGraphQLAnime[] };
  }>(lastReleases, { page, perPage });

  return Page.media.map(mapRawToAnime);
}

export async function getStudiosAnime(
  page = 1,
  perPage = 1
): Promise<Studio[]> {
  const { Page } = await graphqlClient.request<{
    Page: { studios: RawGraphQLStudio[] };
  }>(studios, { page, perPage });
  return Page.studios.map(mapRawToStudio);
}
