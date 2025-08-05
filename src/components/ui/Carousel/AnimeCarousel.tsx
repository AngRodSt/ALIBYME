"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";

import { Navigation } from "swiper/modules";
import AnimeCard from "../AnimeCard";
import { Anime } from "@/models/Anime";
import { AnimeCardSize, cardSizeClasses } from "@/types/cardSizes";
import { useId } from "react";
import { useUserStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/client";

//Function to create a carousel for the products
interface AnimeCarouselProps {
  animes?: Anime[];
  cardSize?: AnimeCardSize;
  showOverlay?: boolean;
}

export default function AnimeCarousel({
  animes,
  cardSize = "medium",
  showOverlay = true,
}: AnimeCarouselProps) {
  const supabase = createClient();
  const user = useUserStore((s) => s.user);
  const addFavorite = useUserStore((s) => s.addFavorite);
  const removeFavorite = useUserStore((s) => s.removeFavorite);
  const favorites = useUserStore((s) => s.favorites);

  const uniqueId = useId();
  const nextButtonClass = `swiper-button-next-${uniqueId}`;
  const prevButtonClass = `swiper-button-prev-${uniqueId}`;

  // PlaceHolders if there is not data
  const displayItems: (Anime | null)[] =
    Array.isArray(animes) && animes.length > 0 ? animes : Array(6).fill(null);

  // Ajustar altura mínima basada en el tamaño de carta
  const minHeights = {
    small: "min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]",
    medium: "min-h-[280px] sm:min-h-[300px] lg:min-h-[340px]",
    large: "min-h-[340px] sm:min-h-[400px] lg:min-h-[480px]",
  };

  const handleToggleFavorite = (animeId: number, isNowFavorite: boolean) => {
    if (!user) return;
    if (isNowFavorite) {
      addFavorite(animeId, user.id, supabase);
    } else {
      removeFavorite(animeId, user.id, supabase);
    }
  };

  return (
    <>
      <div
        data-testid="anime-carousel"
        className={`relative w-full ${minHeights[cardSize]}`}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={2}
          slidesPerView={2}
          centeredSlides={false}
          navigation={{
            nextEl: `.${nextButtonClass}`,
            prevEl: `.${prevButtonClass}`,
          }}
          slidesPerGroupAuto={false}
          slidesPerGroup={2}
          breakpoints={{
            380: { slidesPerView: 2.2, spaceBetween: 12, slidesPerGroup: 2 },
            480: { slidesPerView: 2.8, spaceBetween: 16, slidesPerGroup: 2 },
            640: { slidesPerView: 3.5, spaceBetween: 2, slidesPerGroup: 3 },
            768: { slidesPerView: 4.5, spaceBetween: 2, slidesPerGroup: 4 },
            1280: { slidesPerView: 6.5, spaceBetween: 24, slidesPerGroup: 6 },
          }}
        >
          {displayItems.map((anime, index) => (
            <SwiperSlide key={anime?.id || `placeholder-${index}`}>
              {anime ? (
                <AnimeCard
                  anime={anime}
                  size={cardSize}
                  showOverlay={showOverlay}
                  isFavorite={favorites.some((f) => f.anime_id === anime.id)}
                  onToggle={(isNowFavorite: boolean) =>
                    handleToggleFavorite(anime.id, isNowFavorite)
                  }
                />
              ) : (
                <div
                  className={`rounded ${cardSizeClasses[cardSize]} w-full p-2`}
                >
                  <div className="relative h-full w-full bg-gray-800 rounded animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className={`${prevButtonClass} absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#DB372D] focus:ring-offset-2 focus:ring-offset-black`}
          aria-label="Anterior"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className={`${nextButtonClass} absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#DB372D] focus:ring-offset-2 focus:ring-offset-black`}
          aria-label="Siguiente"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
