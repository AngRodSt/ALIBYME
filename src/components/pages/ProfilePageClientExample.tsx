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
      {/* Banner y avatar */}
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

        {/* Grid de animes */}
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
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#DB372D] transition-colors">
                  {item.animes.title || "Anime Title"}
                </h3>
                <p className="text-xs text-gray-400">{item.animes.year}</p>
                {item.animes.score && (
                  <p className="text-xs text-yellow-400">
                    Score: {item.animes.score}/100
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
