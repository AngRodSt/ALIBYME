/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense } from "react";
import {
  getTrendingAnime,
  getLastReleases,
  getPopularAnime,
  getStudiosAnime,
  getTopAnime,
} from "@/services/anime/animeGraphqlService";
import HomePageClient from "@/components/layout/HomePageClient";

//Lading component
function HomePageSkeleton() {
  return (
    <section className="bg-[#111111] relative">
      <div className="relative h-screen w-full">
        <div className="h-full lg:h-230 w-full bg-gray-800 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  try {
    const [
      trendingAnime,
      popularAnime,
      bannerData,
      lastReleasesAnime,
      studiosAnime,
    ] = await Promise.all([
      getTrendingAnime(1, 25),
      getPopularAnime(1, 25),
      getTopAnime(),
      getLastReleases(1, 25),
      getStudiosAnime(1, 10),
    ]);

    return (
      <Suspense fallback={<HomePageSkeleton />}>
        <HomePageClient
          initialData={{
            trendingAnime,
            popularAnime,
            bannerData,
            lastReleasesAnime,
            studiosAnime,
          }}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }
}

export async function generateMetadata() {
  try {
    const bannerData = await getTopAnime();
    return {
      title: bannerData?.title
        ? `${bannerData.title} - ALIBYME`
        : "ALIBYME - Discover Amazing Anime",
      description:
        bannerData?.description?.slice(0, 160) ||
        "Discover trending anime, get personalized recommendations, and build your perfect collection.",
      openGraph: {
        images: bannerData?.coverUrl ? [bannerData.coverUrl] : [],
        title: bannerData?.title || "ALIBYME",
        description:
          bannerData?.description?.slice(0, 160) ||
          "Discover amazing anime content",
      },
    };
  } catch (error) {
    return {
      title: "ALIBYME - Discover Amazing Anime",
      description:
        "Discover trending anime, get personalized recommendations, and build your perfect collection.",
    };
  }
}
