import { graphqlClient } from "./graphqlClient";
import { trendingQuery, topAnimeQuery } from "@/gql/queries";
import { Anime, RawGraphQLAnime } from "@/models/Anime";
import { mapRawToAnime } from "@/utils/mapGraphqlAnime";

export async function getTrendingAnime(
  page = 1,
  perPage = 15
): Promise<Anime[]> {
  const { Page } = await graphqlClient.request<{
    Page: { media: RawGraphQLAnime[] };
  }>(trendingQuery, { page, perPage });
  return Page.media.map(mapRawToAnime);
}

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
