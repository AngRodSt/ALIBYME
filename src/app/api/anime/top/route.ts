import { NextResponse } from "next/server";
import { getTopAnime } from "@/services/anime/animeGraphqlService";

export async function GET() {
  try {
    const anime = await getTopAnime();

    return NextResponse.json(anime);
  } catch (error) {
    console.error("Error in top anime API:", error);
    return NextResponse.json(
      { error: "Failed to fetch top anime" },
      { status: 500 }
    );
  }
}
