import { Anime, Studio } from "@/models/Anime";

const API_BASE = "/api/anime";

export async function fetchTrendingAnime(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  try {
    const response = await fetch(
      `${API_BASE}/trending?page=${page}&perPage=${perPage}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching studios anime:", error);
    return [];
  }
}

export async function fetchPopularAnime(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  try {
    const response = await fetch(
      `${API_BASE}/popular?page=${page}&perPage=${perPage}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching popular anime:", error);
    return [];
  }
}

export async function fetchTopAnime(): Promise<Anime | null> {
  try {
    const response = await fetch(`${API_BASE}/top`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return null;
  }
}

export async function fetchLastReleasesAnime(
  page = 1,
  perPage = 25
): Promise<Anime[]> {
  try {
    const response = await fetch(
      `${API_BASE}/last-releases?page=${page}&perPage=${perPage}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error feching last releases anime: ", error);
    return [];
  }
}

export async function fetchStudiosAnime(
  page = 1,
  perPage = 10
): Promise<Studio[]> {
  try {
    const response = await fetch(
      `${API_BASE}/studios?page=${page}&perPage=${perPage}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    return [];
  }
}
