"use client";

import Image from "next/image";
import AnimeCarousel from "@/components/ui/Carousel/AnimeCarousel";
import PopularAnimeCarousel from "@/components/ui/Carousel/PopularAnimeCarousel";
import AIRecommendationsOverlay from "@/components/ui/AIRecommendationsOverlay";
import StudiosCarousel from "@/components/ui/Carousel/StudioCarousel";
import { Anime, Studio } from "@/models/Anime";
interface HomePageClientProps {
  initialData: {
    trendingAnime: Anime[];
    popularAnime: Anime[];
    bannerData: Anime | null;
    lastReleasesAnime: Anime[];
    studiosAnime: Studio[];
    backgroundUrl: string;
  };
}

export default function HomePageClient({ initialData }: HomePageClientProps) {
  const {
    trendingAnime,
    popularAnime,
    bannerData,
    lastReleasesAnime,
    studiosAnime,
    backgroundUrl,
  } = initialData;

  return (
    <>
      <section className="bg-[#111111] relative ">
        {/* Hero Image Section */}
        <div className="relative h-screen w-full  ">
          <div
            className="h-full lg:h-230 w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundUrl})`,
            }}
          ></div>

          {/* Overlay */}
          <div className="absolute h-full lg:h-230 w-full inset-0 bg-black/90 z-10"></div>

          {/* Text Content */}
          <div className="container mx-auto absolute inset-0 z-20 flex flex-col lg:flex-row items-center justify-center px-8 pt-40 lg:pt-0 pb-32 lg:pb-36">
            {/* Text Section */}
            <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-3xl lg:text-5xl text-white font-bold">
                {bannerData?.title || "Loading..."}
              </h1>
              <p
                className="text-white mt-4 max-w-md mx-auto lg:mx-0"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: "1.5",
                }}
              >
                {bannerData?.description || "Loading description..."}
              </p>
              <div className="mt-6 flex gap-4 justify-center lg:justify-start">
                <button className="bg-white text-black font-semibold px-6 py-3 rounded-2xl transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DB372D] focus:ring-offset-2 focus:ring-offset-[#111111]">
                  See More
                </button>
                <button className="bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white font-semibold transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-l px-6 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#DB372D] focus:ring-offset-2 focus:ring-offset-[#111111]">
                  To Watch
                </button>
              </div>
            </div>

            {/* Image Card Section */}
            <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-48 h-64 sm:w-80 sm:h-[28rem] lg:w-80 lg:h-[30rem] overflow-hidden rounded-2xl  transform hover:scale-105 hover:-translate-y-3 transition-all duration-500 ease-out group">
                <Image
                  src={bannerData?.coverUrl || "/images/prueba.jpeg"}
                  alt={bannerData?.title || "Anime"}
                  fill
                  sizes="(max-width: 640px) 12rem, (max-width: 1024px) 20rem, 20rem"
                  className="object-cover"
                  priority
                />
                {/* Shine Effect Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] bg-[position:-100%_0] bg-no-repeat transition-[background-position_0s_ease] group-hover:bg-[position:200%_0] group-hover:duration-[1500ms] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section (Overlapping Up) */}
        <div className="overflow-hidden lg:-mt-50 z-30 relative pl-4 pr-8 pb-10 ">
          <h2 className="text-white text-2xl mb-4 px-4 pt-4">
            Trending Titles You Can’t Miss
          </h2>
          <AnimeCarousel animes={trendingAnime || []} />
          <h2 className="text-white text-2xl mb-4 px-4 pt-4">
            Highest Rated of All Time
          </h2>
          <PopularAnimeCarousel animes={popularAnime || []} />
          {/*Section for the recommendations if the user is logIn*/}
          <div className="relative">
            <h2 className="text-white text-2xl mb-4 px-4 pt-4">
              AI Personal Recommendations
            </h2>
            <AnimeCarousel animes={[]} />

            {/* Black Overlay for Login Required */}
            <AIRecommendationsOverlay
              onLoginClick={() => {
                // TODO: Add navigation to login page
                console.log("Navigate to login");
              }}
            />
          </div>
          <h2 className="text-white text-2xl mb-4 px-4 pt-4">
            Start Watching the Latest Hits
          </h2>
          <AnimeCarousel animes={lastReleasesAnime || []} />

          <h2 className="text-white text-2xl mb-4 px-4 pt-4">
            From the Creators of Your Favorites
          </h2>
          <StudiosCarousel studios={studiosAnime || []} />
        </div>
      </section>
    </>
  );
}
