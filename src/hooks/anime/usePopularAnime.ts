import { useState, useEffect } from "react";
import { fetchPopularAnime } from "@/services/anime/animeClientService";
import { Anime } from "@/models/Anime";

export function usePopularAnime() {
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPopularAnime()
      .then(setData)
      .catch(() => setError("Error loading popular animes"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
