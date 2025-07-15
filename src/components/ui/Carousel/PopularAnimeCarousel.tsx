"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";

import { Navigation } from "swiper/modules";
import AnimeCard from "../AnimeCard";
import { Anime } from "@/models/Anime";
import { useId } from "react";

interface PopularAnimeCarouselProps {
  animes: Anime[];
}

export default function PopularAnimeCarousel({
  animes,
}: PopularAnimeCarouselProps) {
  const uniqueId = useId();
  const nextButtonClass = `swiper-button-next-${uniqueId}`;
  const prevButtonClass = `swiper-button-prev-${uniqueId}`;

  // PlaceHolders if there is not data
  const displayItems = animes?.length > 0 ? animes : Array(4).fill(null);

  return (
    <>
      <div className="relative w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[480px]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={false}
          navigation={{
            nextEl: `.${nextButtonClass}`,
            prevEl: `.${prevButtonClass}`,
          }}
          slidesPerGroupAuto={false}
          slidesPerGroup={1}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 20, slidesPerGroup: 1 },
            640: { slidesPerView: 2.2, spaceBetween: 24, slidesPerGroup: 2 },
            768: { slidesPerView: 2.5, spaceBetween: 24, slidesPerGroup: 2 },
            1024: { slidesPerView: 3.2, spaceBetween: 32, slidesPerGroup: 3 },
            1280: { slidesPerView: 4.2, spaceBetween: 32, slidesPerGroup: 4 },
          }}
        >
          {displayItems.map((anime, index) => (
            <SwiperSlide key={anime?.id || `placeholder-${index}`}>
              {anime ? (
                <AnimeCard anime={anime} size="large" showOverlay={true} />
              ) : (
                <div className="rounded h-80 sm:h-96 lg:h-[28rem] w-full p-2">
                  <div className="relative h-full w-full bg-gray-800 rounded animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                      <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className={`${prevButtonClass} absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110`}
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
          className={`${nextButtonClass} absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110`}
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
