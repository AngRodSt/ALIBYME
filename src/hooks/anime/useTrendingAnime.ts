import { useState, useEffect } from "react";
import { getTrendingAnime } from "@/services/anime/animeGraphqlService";
import { Anime } from "@/models/Anime";

export function useTrendingAnime() {
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTrendingAnime()
      .then(setData)
      .catch(() => setError("No se pudo cargar trending."))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
