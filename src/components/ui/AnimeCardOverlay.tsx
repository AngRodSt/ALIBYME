import { Anime } from "@/models/Anime";
import { AnimeCardSize, cardTextSizes } from "@/types/cardSizes";

interface AnimeCardOverlayProps {
  anime: Anime;
  isVisible: boolean;
  size?: AnimeCardSize;
}

export default function AnimeCardOverlay({
  anime,
  isVisible,
  size = "medium",
}: AnimeCardOverlayProps) {
  const textSizes = cardTextSizes[size];

  return (
    <div
      className={`absolute inset-0 bg-black/90 backdrop-blur-sm rounded transition-all duration-300 ease-out transform z-35 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Información superior - título y año primero, con espacio para el icono */}
        <div className="space-y-3 pr-12">
          <div className="space-y-1">
            <p
              className={`text-white font-medium ${textSizes.overlayTitle} drop-shadow-lg`}
              title={anime.title}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
              }}
            >
              {anime.title}
            </p>
            <p
              className={`text-gray-400 ${textSizes.overlaySubtitle} drop-shadow-md`}
            >
              {anime.year}
              {anime.genres && anime.genres.length > 0
                ? ` • ${anime.genres[0]}`
                : ""}
            </p>
          </div>

          {/* Datos estructurados */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span
                className={`text-yellow-400 ${textSizes.overlaySubtitle} font-medium flex items-center`}
              >
                ⭐{" "}
                {anime.popularity
                  ? `${Math.floor(anime.popularity / 1000)}K`
                  : "N/A"}
              </span>
              <span
                className={`text-red-400 ${textSizes.overlaySubtitle} font-medium uppercase tracking-wide`}
              >
                {anime.status || "Unknown"}
              </span>
            </div>

            {anime.episodes && (
              <div className={`text-gray-300 ${textSizes.overlaySubtitle}`}>
                <span className="text-gray-500">Episodios:</span>{" "}
                {anime.episodes}
              </div>
            )}
          </div>
        </div>

        {/* Descripción */}
        {anime.description && (
          <div className="flex-1 flex items-start pt-3">
            <p
              className="text-gray-300 text-3xs leading-relaxed"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: size === "large" ? 4 : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {anime.description
                .replace(/<[^>]*>/g, "")
                .replace(/&[^;]+;/g, " ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
