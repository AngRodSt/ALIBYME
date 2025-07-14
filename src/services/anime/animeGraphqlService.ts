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

// Rate limiting helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestWithRetry<T>(
  queryFn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await queryFn();
    } catch (error: unknown) {
      const errorObj = error as {
        response?: { status?: number };
        message?: string;
      };
      const isRateLimit =
        errorObj?.response?.status === 429 ||
        errorObj?.message?.includes("429") ||
        errorObj?.message?.includes("Rate limit");

      if (isRateLimit && attempt < maxRetries) {
        const delayTime = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
        console.warn(
          `Rate limit hit, retrying in ${delayTime}ms (attempt ${attempt}/${maxRetries})`
        );
        await delay(delayTime);
        continue;
      }

      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

export async function getTopAnime(): Promise<Anime | null> {
  try {
    return await requestWithRetry(async () => {
      const { Page } = await graphqlClient.request<{
        Page: { media: RawGraphQLAnime[] };
      }>(topAnimeQuery);

      const anime = Page.media[0];
      return anime ? mapRawToAnime(anime) : null;
    });
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return null;
  }
}

export async function getTrendingAnime(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  try {
    return await requestWithRetry(async () => {
      const { Page } = await graphqlClient.request<{
        Page: { media: RawGraphQLAnime[] };
      }>(trendingQuery, { page, perPage });

      return Page.media.map(mapRawToAnime);
    });
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    return [];
  }
}

export async function getPopularAnime(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  try {
    return await requestWithRetry(async () => {
      const { Page } = await graphqlClient.request<{
        Page: { media: RawGraphQLAnime[] };
      }>(popularQuery, { page, perPage });

      return Page.media.map(mapRawToAnime);
    });
  } catch (error) {
    console.error("Error fetching popular anime:", error);
    return [];
  }
}

export async function getLastReleases(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  try {
    return await requestWithRetry(async () => {
      const { Page } = await graphqlClient.request<{
        Page: { media: RawGraphQLAnime[] };
      }>(lastReleases, { page, perPage });

      return Page.media.map(mapRawToAnime);
    });
  } catch (error) {
    console.error("Error fetching releases anime:", error);
    return [];
  }
}

export async function getStudiosAnime(
  page = 1,
  perPage = 20
): Promise<Studio[]> {
  try {
    return await requestWithRetry(async () => {
      const { Page } = await graphqlClient.request<{
        Page: { studios: RawGraphQLStudio[] };
      }>(studios, { page, perPage });

      return Page.studios.map(mapRawToStudio);
    });
  } catch (error) {
    console.error("Error fetching studios anime:", error);
    return [];
  }
}
