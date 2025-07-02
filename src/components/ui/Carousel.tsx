"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";

import { Navigation } from "swiper/modules";
import AnimeCard from "./AnimeCard";
import { Anime } from "@/models/Anime";

//Function to create a carousel for the products
interface AnimeCarouselProps {
  animes: Anime[];
}

export default function AnimeCarousel({ animes }: AnimeCarouselProps) {
  return (
    <>
      <div className="relative w-full min-h-[300px]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {animes.map((anime) => (
            <SwiperSlide key={anime.id}>
              <AnimeCard anime={anime} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next "></div>
      </div>
    </>
  );
}
