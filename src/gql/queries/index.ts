// Exportación de las consultas GraphQL
export const searchAnimeQuery = `
  query SearchAnime($search: String!, $perPage: Int) {
    Page(perPage: $perPage) {
      media(search: $search, type: ANIME, sort: [POPULARITY_DESC]) {
        id
        title {
          english
          romaji
          native
        }
        description(asHtml: false)
        coverImage {
          extraLarge
        }
        status
        startDate {
          year
        }
        genres
        popularity
      }
    }
  }
`;

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

export const animeById = `
query AnimeById($id: Int!) {
  Media(id: $id) {
    id
    title {
      romaji
      english
      native
    }
    trailer {
      site
      thumbnail
      id
    }
    relations {
      edges {
        relationType
        node {
          id
          title {
            english
            native
          }
          description
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
    recommendations(page: 1, perPage: 15) {
      edges {
        node {
          mediaRecommendation {
            id
            title {
              english
              native
            }
            description
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
    }
    type
    format
    status
    episodes
    duration
    season
    seasonYear
    countryOfOrigin
    source
    studios {
      nodes {
        name
      }
    }
    volumes
    chapters
    coverImage {
      extraLarge
    }
    bannerImage
    description
    averageScore
    genres
    tags {
      name
    }
    staff {
      nodes {
        name {
          userPreferred
        }
        age
        image {
          medium
        }
        dateOfBirth {
          year
          month
          day
        }
        primaryOccupations
        staffMedia(perPage: 1) {
          nodes {
            id
            title {
              userPreferred
            }
          }
        }
      }
    }
    characters {
      nodes {
        name {
          userPreferred
        }
        image {
          large
        }
      }
    }
  }
}`;
