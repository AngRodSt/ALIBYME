import AnimeDescriptionPage from "@/components/layout/AnimeDescriptionPage";
import { getAnimeById } from "@/services/anime/animeGraphqlService";
import React, { Suspense } from "react";

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

export default async function AnimePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const animeData = await getAnimeById(parseInt(params.id, 10));
    console.log("Anime Data:", animeData);
    // Ensure animeData has a valid id
    if (!animeData || typeof animeData.id === "undefined") {
      throw new Error("Anime data is missing or invalid");
    }

    return (
      <Suspense fallback={<HomePageSkeleton />}>
        <AnimeDescriptionPage {...animeData} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading anime page data:", error);
    return null;
  }
}

export async function generateMetadata() {
  try {
    return {
      title: "ALIBYME - Discover Amazing Anime",
      description:
        "Discover trending anime, get personalized recommendations, and build your perfect collection.",
      openGraph: {
        title: "ALIBYME",
        description: "Discover amazing anime content",
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      title: "ALIBYME - Discover Amazing Anime",
      description:
        "Discover trending anime, get personalized recommendations, and build your perfect collection.",
    };
  }
}
