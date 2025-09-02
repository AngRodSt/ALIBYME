import { FavoriteWithAnime, UserAnimeStatusWithAnime } from "@/models/Anime";
import { FilterOptions } from "@/components/ui/AnimeFilters";

export function applyFilters(
  animes: (FavoriteWithAnime | UserAnimeStatusWithAnime)[],
  filters: FilterOptions
): (FavoriteWithAnime | UserAnimeStatusWithAnime)[] {
  let filtered = [...animes];

  // Filter by genres
  if (filters.selectedGenres.length > 0) {
    filtered = filtered.filter((item) => {
      if (!Array.isArray(item.animes.genres)) return false;
      return filters.selectedGenres.some((selectedGenre) =>
        item.animes.genres!.includes(selectedGenre)
      );
    });
  }

  // Filter by year range
  if (filters.yearRange.min !== null || filters.yearRange.max !== null) {
    filtered = filtered.filter((item) => {
      const year = item.animes.year;
      if (!year) return false;

      const minYear = filters.yearRange.min;
      const maxYear = filters.yearRange.max;

      if (minYear !== null && year < minYear) return false;
      if (maxYear !== null && year > maxYear) return false;

      return true;
    });
  }

  // Sort the results
  filtered.sort((a, b) => {
    let comparison = 0;

    switch (filters.sortBy) {
      case "alphabetic":
        comparison = a.animes.title.localeCompare(b.animes.title);
        break;
      case "year":
        const yearA = a.animes.year || 0;
        const yearB = b.animes.year || 0;
        comparison = yearA - yearB;
        break;
      case "dateAdded":
        // For date added, we'll use anime_id as a proxy since newer entries tend to have higher IDs
        // In a real implementation, you'd want to add created_at timestamps to your tables
        comparison = a.anime_id - b.anime_id;
        break;
      default:
        comparison = 0;
    }

    return filters.sortOrder === "desc" ? -comparison : comparison;
  });

  return filtered;
}

export function getDefaultFilters(): FilterOptions {
  return {
    sortBy: "dateAdded",
    sortOrder: "desc",
    selectedGenres: [],
    yearRange: { min: null, max: null },
  };
}
