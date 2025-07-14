import { NextResponse } from "next/server";
import { getPopularAnime } from "@/services/anime/animeGraphqlService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "25");

    const animes = await getPopularAnime(page, perPage);

    return NextResponse.json(animes);
  } catch (error) {
    console.error("Error in popular API:", error);
    return NextResponse.json(
      { error: "Failed to fetch popular anime" },
      { status: 500 }
    );
  }
}
