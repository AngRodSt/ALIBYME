// Exportación de las consultas GraphQL
export const trendingQuery = `
  query TrendingAnime($perPage: Int = 15, $page: Int = 1) {
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
