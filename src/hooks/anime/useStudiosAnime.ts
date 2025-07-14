import { useState, useEffect } from "react";
import { fetchStudiosAnime } from "@/services/anime/animeClientService";
import { Studio } from "@/models/Anime";

export function useStudiosAnimes() {
  const [data, setData] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudiosAnime()
      .then(setData)
      .catch(() => setError("No se pudo cargar studios."))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
