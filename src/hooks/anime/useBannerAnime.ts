import { useState, useEffect } from "react";
import { getTopAnime } from "@/services/anime/animeGraphqlService";
import { Anime } from "@/models/Anime";

export function useBannerAnime() {
  const [data, setData] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTopAnime()
      .then(setData)
      .catch(() => setError("No se pudo cargar el banner."))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
