"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import AnimeCard from "../ui/AnimeCard";
import AnimeFilters, { FilterOptions } from "../ui/AnimeFilters";
import { applyFilters, getDefaultFilters } from "@/utils/animeFilters";

export default function ProfilePageClient() {
  const user = useUserStore((state) => state.user);
  const userProfile = useUserStore((state) => state.userProfile);
  const favorites = useUserStore((state) => state.favorites);
  const statuses = useUserStore((state) => state.statuses);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("toWatch");
  const [filters, setFilters] = useState<FilterOptions>(getDefaultFilters());
  const itemsPerPage = 12;

  // Filtrar los animes según la pestaña activa
  const baseFilteredAnimes = useMemo(() => {
    switch (activeTab) {
      case "favorite":
        return favorites;
      case "toWatch":
        return statuses.filter((status) => status.status === "To Watch");
      case "watching":
        return statuses.filter((status) => status.status === "Watching");
      case "watched":
        return statuses.filter((status) => status.status === "Watched");
      default:
        return [];
    }
  }, [activeTab, favorites, statuses]);

  // Aplicar filtros adicionales (género, año, orden)
  const filteredAnimes = useMemo(() => {
    return applyFilters(baseFilteredAnimes, filters);
  }, [baseFilteredAnimes, filters]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const totalItems = filteredAnimes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedAnimes = filteredAnimes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tabs = [
    {
      id: "toWatch",
      label: "To Watch",
      count: statuses.filter((s) => s.status === "To Watch").length,
    },
    {
      id: "watching",
      label: "Watching",
      count: statuses.filter((s) => s.status === "Watching").length,
    },
    {
      id: "watched",
      label: "Watched",
      count: statuses.filter((s) => s.status === "Watched").length,
    },
    {
      id: "favorite",
      label: "Favorite",
      count: favorites.length,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner and avatar  */}
      <div className="relative pt-10 pb-20 w-full">
        <div className="absolute inset-0 bg-gradient-to-t bg-red-900/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16">
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#DB372D] to-[#BD2D69]">
              <Image
                src={
                  user?.user_metadata?.avatar_url ||
                  "/images/profile-avatar.jpg"
                }
                alt={
                  user?.user_metadata?.full_name ||
                  user?.email ||
                  "Profile Avatar"
                }
                width={400}
                height={400}
                quality={100}
                className="rounded-full"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {userProfile?.user_name ||
              user?.user_metadata?.full_name ||
              user?.email ||
              "User"}
          </h1>
          <p className="text-sm text-gray-300 mb-3">
            Alibymer since{" "}
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>Level 15</span>
            <span>•</span>
            <span>
              {statuses.filter((s) => s.status === "Watched").length} anime
              completed
            </span>
            <span>•</span>
            <span>{favorites.length} favorites</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap gap-4 border-b border-gray-700/50 pb-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
                setFilters(getDefaultFilters()); // Reset filters when changing tabs
              }}
              className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-white bg-gradient-to-r from-[#DB372D] to-[#BD2D69] border-b-2 border-[#DB372D]"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {tab.label} <span className="text-sm">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <AnimeFilters
          filteredAnimes={baseFilteredAnimes}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Anime grid */}
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 overflow-hidden pb-20">
          {paginatedAnimes.map((item) => (
            <AnimeCard
              key={item.animes.anime_id}
              anime={{
                ...item.animes,
                id: item.animes.anime_id,
                description: item.animes.description || "",
              }}
            />
          ))}
        </div>

        {/* Message when there is no data */}
        {filteredAnimes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-2">
              No animes found in this category
            </div>
            <p className="text-gray-500 text-sm">
              Start adding animes to your list to see them here!
            </p>
          </div>
        )}

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center  pb-8 gap-4">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
              results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white"
                          : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
