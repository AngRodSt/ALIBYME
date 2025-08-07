"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";

export default function ProfilePageClient() {
  const user = useUserStore((state) => state.user);
  const userProfile = useUserStore((state) => state.userProfile);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("toWatch");
  const itemsPerPage = 12;
  const totalItems = 48; // Example total
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const tabs = [
    { id: "toWatch", label: "To Watch", count: 56 },
    { id: "watching", label: "Watching", count: 10 },
    { id: "watched", label: "Watched", count: 52 },
    { id: "favorite", label: "Favorite", count: 10 },
    { id: "collections", label: "Collections", count: 3 },
  ];

  return (
    <div className="min-h-screen  bg-black text-white">
      {/* Banner y avatar mejorado */}
      <div className="relative pt-10 pb-20 w-full ">
        <div className="absolute inset-0 bg-gradient-to-t bg-red-900/20" />
        <div className="relative z-10  flex flex-col items-center justify-center h-full pt-16">
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
              "AngRod Sth"}
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
            <span>127 anime completed</span>
            <span>•</span>
            <span>1,250 episodes watched</span>
          </div>
        </div>
      </div>

      {/* Tabs mejorados */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap gap-4 border-b border-gray-700/50 pb-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

        {/* Controles mejorados */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort By:</span>
              <select className="bg-gray-800 border border-gray-600 px-3 py-1 rounded-lg text-white text-sm focus:border-[#DB372D] focus:outline-none">
                <option>Title A-Z</option>
                <option>Recently Added</option>
                <option>Rating</option>
                <option>Year</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">View:</span>
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button className="p-1 rounded bg-[#DB372D] text-white">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="p-1 rounded text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-[#DB372D] to-[#BD2D69] hover:from-[#BD2D69] hover:to-[#DB372D] px-6 py-2 rounded-lg text-white font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>
        </div>

        {/* Grid de animes mejorado */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(itemsPerPage)].map((_, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-[#DB372D]/50"
            >
              <div className="relative overflow-hidden">
                <Image
                  src="/images/anime-placeholder.jpg"
                  alt="Anime Cover"
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
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    9.2
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#DB372D] transition-colors">
                  Spy x Family Part 2
                </h3>
                <p className="text-xs text-gray-400 mb-1">2022 • Comedy</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Action</p>
                  <div className="w-8 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-[#DB372D] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación mejorada */}
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
              {[
                ...Array(Math.min(5, Math.ceil(totalItems / itemsPerPage))),
              ].map((_, i) => {
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
                setCurrentPage(
                  Math.min(
                    Math.ceil(totalItems / itemsPerPage),
                    currentPage + 1
                  )
                )
              }
              disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
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
      </div>
    </div>
  );
}
