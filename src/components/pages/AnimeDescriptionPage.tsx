"use client";
import React, { useState } from "react";
import Image from "next/image";

import {
  Star,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  LibraryBig,
} from "lucide-react";
import AnimeCarousel from "@/components/ui/Carousel/AnimeCarousel";
import FavoriteIcon from "@/components/ui/FavoriteIcon";
import TrailerButton from "@/components/ui/TrailerButton";
import WatchStatusSelector from "@/components/forms/WatchStatusSelector";
import { AnimeById } from "@/models/Anime";

export default function AnimeDescriptionPage(initialData: AnimeById) {
  const [selectedOverview, setSelectedOverview] = useState<boolean>(true);

  // Helper function to get rating stars
  const getRatingStars = (score: number | undefined) => {
    if (!score) return 0;
    return Math.round((score / 100) * 5); // Convert 0-100 to 0-5 stars
  };

  const ratingStars = getRatingStars(initialData.averageScore);

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        {/* Background Image */}
        <div
          className="h-full w-full bg-cover bg-center lg:h-160"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.8)), url('${
              initialData.bannerImage || initialData.coverUrl
            }')`,
          }}
        />

        {/* Content */}
        <section className="absolute inset-0 flex items-center ">
          <div className="container mx-auto px-8 flex flex-col lg:flex-row gap-12 items-center lg:items-start ">
            {/* Anime Poster */}
            <div className="flex-shrink-0 relative z-30 ">
              <div className="relative w-64 h-96 lg:w-96 lg:h-[620px]  rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={initialData.coverUrl}
                  alt={initialData.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Rating Badge */}
                {initialData.averageScore && (
                  <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg px-3 py-2 flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={star <= ratingStars ? "currentColor" : "none"}
                          className={
                            star <= ratingStars
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-white text-sm font-medium">
                      {(initialData.averageScore / 10).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Anime Info */}
            <section className="flex-1 text-center lg:text-left space-y-6 ">
              {/* Title */}
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2">
                  {initialData.title}
                </h1>
                {initialData.native && (
                  <p className="text-xl text-gray-300">{initialData.native}</p>
                )}
              </div>

              {/* Meta Info */}
              <section className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-300">
                {initialData.seasonYear && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{initialData.seasonYear}</span>
                  </div>
                )}
                {initialData.duration && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{initialData.duration} min/ep</span>
                  </div>
                )}
                {initialData.format && (
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{initialData.format}</span>
                  </div>
                )}
                {initialData.episodes && (
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} />
                    <span>{initialData.episodes} episodes</span>
                  </div>
                )}
              </section>

              {/* Action Buttons - Watch Status Selector */}
              <WatchStatusSelector animeId={initialData.id} />

              {/*Favorite Button*/}
              <p className=" font-light  text-sm text-gray-300 mb-2">Add to</p>
              <section className="mt-4 relative z-40 justify-between flex items-center max-w-[462px]">
                <section className="flex gap-2">
                  <FavoriteIcon size={24} />
                  <div
                    className="flex w-10 p-2 rounded-full bg-black/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:scale-110
                  focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <LibraryBig
                      color="white"
                      size={24}
                      className="transition-all duration-200 hover:scale-110 hover:stroke-red-400"
                    />
                  </div>
                </section>
                <section>
                  {/* Trailer Button Component */}
                  <TrailerButton trailer={initialData.trailer} />
                </section>
              </section>
            </section>
          </div>
        </section>
      </section>

      {/* Additional Content Section - Poster extends into this section */}
      <section className="relative px-8 pb-16 mt-10 md:-mt-10 lg:-mt-70 ">
        <div className="container mx-auto relative">
          {/* Poster extension area - invisible but reserves space */}
          <div className="w-64 lg:w-80 h-20 lg:h-32 mb-8 lg:mb-16"></div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-700 mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setSelectedOverview(true)}
                className={` pb-4 px-1 font-medium ${
                  selectedOverview
                    ? "border-b-2 border-white text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedOverview(false)}
                className={` ${
                  !selectedOverview
                    ? "border-b-2 border-white text-white"
                    : "text-gray-400 hover:text-white"
                }  pb-4 px-1 font-medium`}
              >
                Relation
              </button>
            </nav>
          </div>
          {selectedOverview ? (
            <>
              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Details */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Details
                  </h2>
                  <div className="flex">
                    <div className="space-y-4 flex flex-col">
                      <span className="text-gray-400">Type</span>
                      <span className="text-gray-400">Episodes</span>
                      <span className="text-gray-400">Genres</span>
                      <span className="text-gray-400">Aired</span>
                      <span className="text-gray-400">Status</span>
                      <span className="text-gray-400">Season</span>
                      <span className="text-gray-400">Studios</span>
                      <span className="text-gray-400">Source</span>
                      <span className="text-gray-400">Rating</span>
                      <span className="text-gray-400">Duration</span>
                    </div>
                    <div className="space-y-4 flex flex-col ml-10">
                      <span className="text-white">
                        {initialData.format || "N/A"}
                      </span>
                      <span className="text-white">
                        {initialData.episodes || "N/A"}
                      </span>
                      <span className="text-white">
                        {initialData.genres?.join(", ") || "N/A"}
                      </span>
                      <span className="text-white">
                        {initialData.season && initialData.seasonYear
                          ? `${initialData.season} ${initialData.seasonYear}`
                          : "N/A"}
                      </span>
                      <span className="text-white">
                        {initialData.status || "N/A"}
                      </span>
                      <span className="text-white">
                        {initialData.season && initialData.seasonYear
                          ? `${initialData.season} ${initialData.seasonYear}`
                          : "N/A"}
                      </span>
                      <span
                        className="text-white max-w-[200px] truncate overflow-ellipsis whitespace-nowrap block"
                        title={initialData.studios?.join(", ") || "N/A"}
                      >
                        {initialData.studios?.join(", ") || "N/A"}
                      </span>
                      <span className="text-white">
                        {initialData.source || "N/A"}
                      </span>
                      <span className="text-white">
                        {initialData.averageScore
                          ? `${initialData.averageScore}/100`
                          : "N/A"}
                      </span>
                      <span className="text-white">
                        {initialData.duration
                          ? `${initialData.duration} min.`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Description */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Description
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    {initialData.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: initialData.description
                            .replace(/<br\s*\/?>/gi, "</p><p>")
                            .replace(/^/, "<p>")
                            .replace(/$/, "</p>"),
                        }}
                        className="space-y-4"
                      />
                    ) : (
                      <p>No description available.</p>
                    )}
                  </div>

                  {/* Genres Section */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2 ">
                      {initialData.genres?.map((genre) => (
                        <span
                          key={genre}
                          className="px-2 py-1 bg-red-500/20 rounded-md text-xs text-red-200 backdrop-blur-sm border border-red-500/30"
                        >
                          {genre}
                        </span>
                      )) || (
                        <span className="text-gray-400">
                          No genres available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags Section */}
                  {initialData.tags && initialData.tags.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-white mb-4">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2 ">
                        {initialData.tags.slice(0, 10).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-red-500/20 rounded-md text-xs text-red-200 backdrop-blur-sm border border-red-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Related Anime Section */}
              {initialData.relations && initialData.relations.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-white mb-8">
                    Related Anime
                  </h2>
                  <AnimeCarousel
                    animes={initialData.relations
                      .flatMap((relation) => relation.anime)
                      .slice(0, 10)}
                  />
                </div>
              )}
            </>
          )}
          {/* Characters Section */}
          {initialData.characters && initialData.characters.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-8">
                Main Characters
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {initialData.characters.slice(0, 12).map((character, index) => (
                  <div key={index} className="group">
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-800 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-white font-semibold text-center text-sm line-clamp-2">
                      {character.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Staff Section */}
          {initialData.staff && initialData.staff.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-8">Staff</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialData.staff.slice(0, 6).map((staffMember, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      {staffMember.image && (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={staffMember.image}
                            alt={staffMember.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg line-clamp-1">
                          {staffMember.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {staffMember.primaryOccupations.join(", ")}
                        </p>
                        {staffMember.recentWork && (
                          <p className="text-gray-500 text-xs mt-1">
                            Recent: {staffMember.recentWork.title}
                          </p>
                        )}
                        {staffMember.age && (
                          <p className="text-gray-500 text-xs">
                            Age: {staffMember.age}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations Section */}
          {initialData.recommendations &&
            initialData.recommendations.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Recommendations
                </h2>
                <AnimeCarousel
                  animes={initialData.recommendations.slice(0, 10)}
                />
              </div>
            )}

          {/* Fallback: Similar Anime Section if no relations/recommendations */}
          {(!initialData.relations || initialData.relations.length === 0) &&
            (!initialData.recommendations ||
              initialData.recommendations.length === 0) && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Similar Anime
                </h2>
                <AnimeCarousel animes={[]} />
              </div>
            )}
        </div>
      </section>
    </div>
  );
}
