"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";

export default function ProfilePageClient() {
  const user = useUserStore((state) => state.user);
  const userProfile = useUserStore((state) => state.userProfile);
  const favorites = useUserStore((state) => state.favorites);
  const statuses = useUserStore((state) => state.statuses);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("toWatch");
  const itemsPerPage = 12;

  // Filtrar los animes según la pestaña activa
  const filteredAnimes = (() => {
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
  })();

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
      {/* Banner y avatar mejorado */}
      <div className="relative pt-10 pb-20 w-full">
        <div className="absolute inset-0 bg-gradient-to-t bg-red-900/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16">
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#DB372D] to-[#BD2D69]">
              <Image
                src={
                  user?.user_metadata?.avatar_url ||
                  "/images/profile-avatar.png"
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

      {/* Tabs mejorados */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap gap-4 border-b border-gray-700/50 pb-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
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

        {/* Grid de animes con datos reales */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {paginatedAnimes.map((item, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-[#DB372D]/50"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.animes.coverUrl || "/images/anime-placeholder.jpg"}
                  alt={item.animes.title || "Anime Cover"}
                  width={200}
                  height={280}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-[#DB372D] p-2 rounded-full text-white hover:bg-[#BD2D69] transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {item.animes.score && (
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {(item.animes.score / 10).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#DB372D] transition-colors">
                  {item.animes.title || "Anime Title"}
                </h3>
                <p className="text-xs text-gray-400 mb-1">
                  {item.animes.year} •{" "}
                  {Array.isArray(item.animes.genres)
                    ? item.animes.genres[0]
                    : "Unknown"}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {Array.isArray(item.animes.genres) &&
                    item.animes.genres.length > 1
                      ? item.animes.genres.slice(1, 2).join(", ")
                      : "Genre"}
                  </p>
                  {item.animes.popularity && (
                    <div className="w-8 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#DB372D] rounded-full"
                        style={{
                          width: `${Math.min(
                            (item.animes.popularity / 100000) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay datos */}
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

        {/* Paginación mejorada */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-12 mb-8 gap-4">
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
