"use client";
import { Search, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getSearchAnime } from "@/services/anime/animeGraphqlService";
import { Anime } from "@/models/Anime";
import Image from "next/image";

interface SearchResult extends Anime {
  matchType?: "exact" | "partial" | "genre";
}

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  // debounce function to limit the rate of search calls
  const debounce = (func: (searchTerm: string) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (searchTerm: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(searchTerm), wait);
    };
  };

  // Search function
  const performSearch = useCallback(async (searchTerm: string) => {
    // Cancel previous search
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (searchTerm.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const searchResults = await getSearchAnime(searchTerm.trim(), 8);

      // Only update if the search was not aborted
      if (!abortControllerRef.current?.signal.aborted) {
        // Add basic match type
        const resultsWithMatchType: SearchResult[] = searchResults.map(
          (anime) => ({
            ...anime,
            matchType: anime.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
              ? ("exact" as const)
              : ("partial" as const),
          })
        );

        setResults(resultsWithMatchType);
        setShowDropdown(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  // Search with debounce
  const debouncedSearch = useMemo(
    () => debounce(performSearch, 300),
    [performSearch]
  );

  // Effect for search
  useEffect(() => {
    if (!value) {
      setResults([]);
      setShowDropdown(false);
      setIsLoading(false);
      return;
    }
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  // Handle anime selection
  const handleSelectAnime = useCallback(
    (anime: SearchResult) => {
      setValue("");
      setShowDropdown(false);
      setSelectedIndex(-1);
      router.push(`/anime/${anime.id}`);
    },
    [router]
  );

  // Handle view all results
  const handleViewAllResults = useCallback(() => {
    setValue("");
    setShowDropdown(false);
    setSelectedIndex(-1);
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
  }, [router, value]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showDropdown) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleSelectAnime(results[selectedIndex]);
          } else if (value.trim()) {
            handleViewAllResults();
          }
          break;
        case "Escape":
          setShowDropdown(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    showDropdown,
    selectedIndex,
    results,
    value,
    handleSelectAnime,
    handleViewAllResults,
  ]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const clearSearch = () => {
    setValue("");
    setResults([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const getMatchTypeBadge = (matchType?: SearchResult["matchType"]) => {
    if (!matchType) return null;

    const badges = {
      exact: { text: "Exact", color: "bg-green-500" },
      partial: { text: "Match", color: "bg-blue-500" },
      genre: { text: "Genre", color: "bg-purple-500" },
    };
    return badges[matchType];
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      {/* Search Input */}
      <div className="focus-within:ring-2 focus-within:ring-[#DB372D] focus-within:border-[#DB372D] flex gap-2 backdrop-blur-md bg-white/10 rounded-2xl p-2 shadow-md items-center transition">
        <Search className="text-gray-300" size={20} />
        <label htmlFor="search" className="sr-only">
          Search anime
        </label>
        <input
          ref={inputRef}
          id="search"
          type="text"
          placeholder="Search your favorite anime"
          className="bg-transparent outline-none w-full text-white placeholder-gray-100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {
            if (value.trim().length >= 2 && results.length > 0) {
              setShowDropdown(true);
            }
          }}
        />

        {isLoading && (
          <Loader2 className="animate-spin text-gray-300" size={18} />
        )}

        {value && !isLoading && (
          <button
            type="button"
            onClick={clearSearch}
            className="text-gray-100 hover:text-red-400 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-50 max-h-96 overflow-hidden">
          {results.length > 0 ? (
            <>
              <div className="max-h-80 overflow-y-auto">
                {results.map((anime, index) => {
                  const badge = getMatchTypeBadge(anime.matchType);
                  return (
                    <div
                      key={anime.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors border-b border-gray-700/50 last:border-b-0 ${
                        index === selectedIndex
                          ? "bg-gray-700/50"
                          : "hover:bg-gray-800/50"
                      }`}
                      onClick={() => handleSelectAnime(anime)}
                    >
                      {/* Anime Cover */}
                      <div className="flex-shrink-0">
                        {anime.coverUrl ? (
                          <Image
                            src={anime.coverUrl}
                            alt={anime.title}
                            width={40}
                            height={56}
                            className="rounded object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-10 h-14 bg-gray-700 rounded flex items-center justify-center">
                            <Search size={16} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Anime Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium truncate">
                            {anime.title}
                          </h3>
                          {badge && (
                            <span
                              className={`px-1.5 py-0.5 text-xs rounded text-white ${badge.color}`}
                            >
                              {badge.text}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          {anime.year && <span>{anime.year}</span>}
                          {anime.year && anime.genres?.[0] && <span>•</span>}
                          {anime.genres?.[0] && <span>{anime.genres[0]}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View All Results */}
              <div className="border-t border-gray-700">
                <button
                  onClick={handleViewAllResults}
                  className="w-full p-3 text-center text-[#DB372D] hover:bg-gray-800/50 transition-colors font-medium"
                >
                  View all results for &ldquo;{value}&rdquo;
                </button>
              </div>
            </>
          ) : value.trim().length >= 2 && !isLoading ? (
            <div className="p-4 text-center text-gray-400">
              No results found for &ldquo;{value}&rdquo;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
