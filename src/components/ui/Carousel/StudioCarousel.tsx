"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Studio } from "@/models/Anime";

interface StudiosCarouselProps {
  studios: Studio[];
}

const StudiosCarousel: React.FC<StudiosCarouselProps> = ({ studios }) => {
  // Filtrar studios válidos que tengan los datos necesarios
  const validStudios =
    studios?.filter((studio) => studio && studio.name && studio.coverUrl) || [];

  if (validStudios.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-white text-lg">No studios available</p>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".studios-swiper-button-next",
          prevEl: ".studios-swiper-button-prev",
        }}
        pagination={{
          el: ".studios-swiper-pagination",
          clickable: true,
          bulletClass: "studios-swiper-bullet",
          bulletActiveClass: "studios-swiper-bullet-active",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
        className="studios-swiper"
      >
        {validStudios.map((studio, index) => (
          <SwiperSlide key={`${studio.name}-${index}`}>
            <div className="relative group cursor-pointer">
              {/* Card Container */}
              <div
                className="relative h-40 w-full rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#DB372D] focus:ring-offset-2 focus:ring-offset-black"
                tabIndex={0}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={studio.coverUrl || "/placeholder-anime.jpg"}
                    alt={studio.title || studio.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-anime.jpg";
                    }}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300"></div>

                {/* Studio Name */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <h3 className="text-white text-xl lg:text-2xl font-bold text-center px-4 transform transition-all duration-300 group-hover:scale-110 group-hover:text-shadow-lg">
                    {studio.name}
                  </h3>
                </div>

                {/* Popular Anime Info - Appears on Hover */}
                {studio.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-white text-sm opacity-90">
                      Popular: {studio.title}
                    </p>
                    {studio.favorites && (
                      <div className="flex items-center mt-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-yellow-400 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <p className="text-white text-xs opacity-75">
                          {studio.favorites.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] bg-[position:-100%_0] bg-no-repeat transition-[background-position_0s_ease] group-hover:bg-[position:200%_0] group-hover:duration-[1000ms] pointer-events-none"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="studios-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110">
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

      <button className="studios-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110">
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

      {/* Custom Pagination */}
      <div className="studios-swiper-pagination flex justify-center mt-4 space-x-2"></div>

      <style jsx global>{`
        .studios-swiper-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .studios-swiper-bullet-active {
          background: #db372d;
          transform: scale(1.2);
        }

        .studios-swiper-bullet:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default StudiosCarousel;
