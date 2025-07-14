// Exportación de las consultas GraphQL
export const trendingQuery = `
  query TrendingAnime($perPage: Int = 25, $page: Int = 1) {
    Page(perPage: $perPage, page: $page) {
      media(sort: TRENDING_DESC, type: ANIME, format_in: [TV, TV_SHORT]) {
        id
        title {
          english
          native
        }
        description(asHtml: false)
        coverImage {
          extraLarge
        }
        startDate {
          year
        }
        genres
        status
        episodes
        popularity
      }
    }
  }
`;

export const popularQuery = `
  query PopularQuery($perPage: Int = 25, $page: Int = 1) {
    Page(perPage: $perPage, page: $page) {
      media(sort: POPULARITY_DESC, type: ANIME, format_in: [TV, TV_SHORT]) {
        id
        title {
          english
          native
        }
        description(asHtml: false)
        coverImage {
          extraLarge
        }
        startDate {
          year
        }
        genres
        status
        episodes
        popularity
      }
    }
  }
`;

export const topAnimeQuery = `
  query TopAnime {
    Page(perPage: 1, page: 1) {
      media(sort: SCORE_DESC, type: ANIME) {
        id
        title {
          english
        }
        description(asHtml: false)
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

export const lastReleases = `
query LastReleases {
Page(perPage: 25, page: 1) {
    media(
      sort: [START_DATE_DESC, POPULARITY_DESC],
      type: ANIME,
      status: RELEASING,
      format_in: [TV, TV_SHORT]
    ) {
      id
      title {
        english
        native
      }
      description(asHtml: false)
      coverImage {
        extraLarge
      }
      startDate {
        year
      }
      genres
      status
      episodes
      popularity
    }
  }
}`;

export const studios = `
query Studios {
  Page(perPage: 10, page: 1) {
    studios(sort: FAVOURITES_DESC) {
          name
          favourites
          media(perPage: 1, sort: POPULARITY_DESC) {
            nodes {
              title {
                romaji
                english
              }
              bannerImage
            }
          }
    }
  }
}
`;
