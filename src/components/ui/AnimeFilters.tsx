"use client";
import React, { useState, useEffect } from "react";
import { FavoriteWithAnime, UserAnimeStatusWithAnime } from "@/models/Anime";

export interface FilterOptions {
  sortBy: "alphabetic" | "year" | "dateAdded";
  sortOrder: "asc" | "desc";
  selectedGenres: string[];
  yearRange: {
    min: number | null;
    max: number | null;
  };
}

interface AnimeFiltersProps {
  filteredAnimes: (FavoriteWithAnime | UserAnimeStatusWithAnime)[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function AnimeFilters({
  filteredAnimes,
  filters,
  onFiltersChange,
}: AnimeFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close dropdowns when switching to mobile
  useEffect(() => {
    if (isMobile) {
      // Don't auto-close when switching to mobile, let user decide
    }
  }, [isMobile]);

  // Extraer todos los géneros únicos de los animes
  const availableGenres = React.useMemo(() => {
    const genresSet = new Set<string>();
    filteredAnimes.forEach((item) => {
      if (Array.isArray(item.animes.genres)) {
        item.animes.genres.forEach((genre) => genresSet.add(genre));
      }
    });
    return Array.from(genresSet).sort();
  }, [filteredAnimes]);

  // Extraer el rango de años disponibles
  const yearRange = React.useMemo(() => {
    const years = filteredAnimes
      .map((item) => item.animes.year)
      .filter((year): year is number => year !== undefined && year !== null)
      .sort((a, b) => a - b);

    return {
      min: years[0] || new Date().getFullYear(),
      max: years[years.length - 1] || new Date().getFullYear(),
    };
  }, [filteredAnimes]);

  const handleGenreToggle = (genre: string) => {
    const updatedGenres = filters.selectedGenres.includes(genre)
      ? filters.selectedGenres.filter((g) => g !== genre)
      : [...filters.selectedGenres, genre];

    onFiltersChange({
      ...filters,
      selectedGenres: updatedGenres,
    });
  };

  const handleSortChange = (
    sortBy: FilterOptions["sortBy"],
    sortOrder: FilterOptions["sortOrder"]
  ) => {
    onFiltersChange({
      ...filters,
      sortBy,
      sortOrder,
    });
    setShowSort(false);
  };

  const clearFilters = () => {
    onFiltersChange({
      sortBy: "dateAdded",
      sortOrder: "desc",
      selectedGenres: [],
      yearRange: { min: null, max: null },
    });
    setShowFilters(false);
  };

  const hasActiveFilters =
    filters.selectedGenres.length > 0 ||
    filters.yearRange.min !== null ||
    filters.yearRange.max !== null;

  const getSortLabel = () => {
    const sortLabels = {
      "dateAdded-desc": "Latest Added",
      "dateAdded-asc": "Oldest Added",
      "alphabetic-asc": "A to Z",
      "alphabetic-desc": "Z to A",
      "year-desc": "Newest Year",
      "year-asc": "Oldest Year",
    };
    return (
      sortLabels[
        `${filters.sortBy}-${filters.sortOrder}` as keyof typeof sortLabels
      ] || "Latest Added"
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      {/* Results count with clear filters */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-400">
          {filteredAnimes.length} Product
          {filteredAnimes.length !== 1 ? "s" : ""}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white rounded-lg hover:from-[#BD2D69] hover:to-[#DB372D] transition-all duration-200 transform hover:scale-105 text-sm"
            title="Clear all filters"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear all filters
          </button>
        )}
      </div>

      {/* Filter and Sort buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Filters Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFilters(!showFilters);
              setShowSort(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all duration-200 ${
              hasActiveFilters
                ? "border-[#DB372D] text-[#DB372D] bg-[#DB372D]/10"
                : "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white"
            }`}
          >
            Filters
            {hasActiveFilters && (
              <span className="bg-[#DB372D] text-white text-xs px-1.5 py-0.5 rounded-full">
                {filters.selectedGenres.length +
                  (filters.yearRange.min || filters.yearRange.max ? 1 : 0)}
              </span>
            )}
            <svg
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Filters Dropdown/Sidebar */}
          {showFilters && (
            <>
              {/* Mobile Sidebar */}
              {isMobile ? (
                <div className="fixed inset-0 z-50 flex">
                  <div
                    className="fixed inset-0 bg-black/50"
                    onClick={() => setShowFilters(false)}
                  />
                  <div className="relative bg-gray-900 w-80 max-w-[85vw] h-full overflow-y-auto shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                      <h2 className="text-lg font-semibold text-white">
                        Filters
                      </h2>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-6">
                      {/* Genres Section */}
                      {availableGenres.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-1 h-4 bg-gradient-to-b from-[#DB372D] to-[#BD2D69] rounded"></div>
                            Genres
                          </h3>
                          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {availableGenres.map((genre) => (
                              <label
                                key={genre}
                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-all"
                              >
                                <input
                                  type="checkbox"
                                  checked={filters.selectedGenres.includes(
                                    genre
                                  )}
                                  onChange={() => handleGenreToggle(genre)}
                                  className="w-4 h-4 text-[#DB372D] bg-gray-800 border-gray-600 rounded focus:ring-[#DB372D] focus:ring-2"
                                />
                                <span className="text-sm text-gray-300">
                                  {genre}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Year Range Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-[#DB372D] to-[#BD2D69] rounded"></div>
                          Year Range
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1 font-medium">
                              From
                            </label>
                            <input
                              type="number"
                              placeholder={yearRange.min.toString()}
                              value={filters.yearRange.min || ""}
                              onChange={(e) =>
                                onFiltersChange({
                                  ...filters,
                                  yearRange: {
                                    ...filters.yearRange,
                                    min: e.target.value
                                      ? parseInt(e.target.value)
                                      : null,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:border-[#DB372D] focus:outline-none focus:ring-2 focus:ring-[#DB372D]/20"
                              min={yearRange.min}
                              max={yearRange.max}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1 font-medium">
                              To
                            </label>
                            <input
                              type="number"
                              placeholder={yearRange.max.toString()}
                              value={filters.yearRange.max || ""}
                              onChange={(e) =>
                                onFiltersChange({
                                  ...filters,
                                  yearRange: {
                                    ...filters.yearRange,
                                    max: e.target.value
                                      ? parseInt(e.target.value)
                                      : null,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:border-[#DB372D] focus:outline-none focus:ring-2 focus:ring-[#DB372D]/20"
                              min={yearRange.min}
                              max={yearRange.max}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-700 bg-gray-800">
                      <div className="flex gap-3">
                        <button
                          onClick={clearFilters}
                          className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                          CLEAR
                        </button>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white rounded-lg hover:from-[#BD2D69] hover:to-[#DB372D] transition-all text-sm font-medium"
                        >
                          APPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop Dropdown */
                <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900 border border-gray-700/50 rounded-lg shadow-2xl z-50 backdrop-blur-sm">
                  <div className="p-5">
                    <div className="space-y-6">
                      {/* Genres Section */}
                      {availableGenres.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-1 h-4 bg-gradient-to-b from-[#DB372D] to-[#BD2D69] rounded"></div>
                            Genres
                          </h3>
                          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {availableGenres.map((genre) => (
                              <label
                                key={genre}
                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-200 group"
                              >
                                <input
                                  type="checkbox"
                                  checked={filters.selectedGenres.includes(
                                    genre
                                  )}
                                  onChange={() => handleGenreToggle(genre)}
                                  className="w-4 h-4 text-[#DB372D] bg-gray-800 border-gray-600 rounded focus:ring-[#DB372D] focus:ring-2 focus:ring-offset-0"
                                />
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                  {genre}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Year Range Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-[#DB372D] to-[#BD2D69] rounded"></div>
                          Year Range
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <label className="block text-xs text-gray-400 mb-2 font-medium">
                              From
                            </label>
                            <input
                              type="number"
                              placeholder={yearRange.min.toString()}
                              value={filters.yearRange.min || ""}
                              onChange={(e) =>
                                onFiltersChange({
                                  ...filters,
                                  yearRange: {
                                    ...filters.yearRange,
                                    min: e.target.value
                                      ? parseInt(e.target.value)
                                      : null,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:border-[#DB372D] focus:outline-none focus:ring-2 focus:ring-[#DB372D]/20 transition-all"
                              min={yearRange.min}
                              max={yearRange.max}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs text-gray-400 mb-2 font-medium">
                              To
                            </label>
                            <input
                              type="number"
                              placeholder={yearRange.max.toString()}
                              value={filters.yearRange.max || ""}
                              onChange={(e) =>
                                onFiltersChange({
                                  ...filters,
                                  yearRange: {
                                    ...filters.yearRange,
                                    max: e.target.value
                                      ? parseInt(e.target.value)
                                      : null,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:border-[#DB372D] focus:outline-none focus:ring-2 focus:ring-[#DB372D]/20 transition-all"
                              min={yearRange.min}
                              max={yearRange.max}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sort By Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSort(!showSort);
              setShowFilters(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all duration-200 ${
              filters.sortBy !== "dateAdded" || filters.sortOrder !== "desc"
                ? "border-[#DB372D] text-[#DB372D] bg-[#DB372D]/10"
                : "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white"
            }`}
          >
            <span className="hidden sm:inline">Sort by:</span>
            <span className="font-medium">{getSortLabel()}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                showSort ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Sort Dropdown/Sidebar */}
          {showSort && (
            <>
              {/* Mobile Sidebar */}
              {isMobile ? (
                <div className="fixed inset-0 z-50 flex">
                  <div
                    className="fixed inset-0 bg-black/50"
                    onClick={() => setShowSort(false)}
                  />
                  <div className="relative bg-gray-900 w-80 max-w-[85vw] h-full overflow-y-auto shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                      <h2 className="text-lg font-semibold text-white">
                        Sort by
                      </h2>
                      <button
                        onClick={() => setShowSort(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {[
                        {
                          value: "dateAdded-desc",
                          label: "Latest Added",
                        },
                        {
                          value: "dateAdded-asc",
                          label: "Oldest Added",
                        },
                        { value: "alphabetic-asc", label: "A to Z" },
                        { value: "alphabetic-desc", label: "Z to A" },
                        { value: "year-desc", label: "Newest Year" },
                        { value: "year-asc", label: "Oldest Year" },
                      ].map((option) => {
                        const [sortBy, sortOrder] = option.value.split("-");
                        const isSelected =
                          filters.sortBy === sortBy &&
                          filters.sortOrder === sortOrder;

                        return (
                          <button
                            key={option.value}
                            onClick={() => {
                              handleSortChange(
                                sortBy as FilterOptions["sortBy"],
                                sortOrder as FilterOptions["sortOrder"]
                              );
                              setShowSort(false);
                            }}
                            className={`w-full text-left p-3 mb-2 rounded-lg transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {option.label}
                            </span>
                            {isSelected && (
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop Dropdown */
                <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 border border-gray-700/50 rounded-lg shadow-2xl z-50 backdrop-blur-sm">
                  <div className="py-2">
                    {[
                      { value: "dateAdded-desc", label: "Latest Added" },
                      { value: "dateAdded-asc", label: "Oldest Added" },
                      { value: "alphabetic-asc", label: "A to Z" },
                      { value: "alphabetic-desc", label: "Z to A" },
                      { value: "year-desc", label: "Newest Year" },
                      { value: "year-asc", label: "Oldest Year" },
                    ].map((option) => {
                      const [sortBy, sortOrder] = option.value.split("-");
                      const isSelected =
                        filters.sortBy === sortBy &&
                        filters.sortOrder === sortOrder;

                      return (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleSortChange(
                              sortBy as FilterOptions["sortBy"],
                              sortOrder as FilterOptions["sortOrder"]
                            )
                          }
                          className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center justify-between group ${
                            isSelected
                              ? "text-white bg-gradient-to-r from-[#DB372D]/20 to-[#BD2D69]/20 border-l-2 border-[#DB372D]"
                              : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                          }`}
                        >
                          <span className={isSelected ? "font-medium" : ""}>
                            {option.label}
                          </span>
                          {isSelected && (
                            <svg
                              className="w-4 h-4 text-[#DB372D]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns - only for desktop */}
      {(showFilters || showSort) && !isMobile && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowFilters(false);
            setShowSort(false);
          }}
        />
      )}
    </div>
  );
}
