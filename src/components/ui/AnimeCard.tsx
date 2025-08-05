import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Anime } from "@/models/Anime";
import {
  AnimeCardSize,
  cardSizeClasses,
  cardTextSizes,
} from "@/types/cardSizes";
import FavoriteIcon from "./FavoriteIcon";
import AnimeCardOverlay from "./AnimeCardOverlay";

interface AnimeCardProps {
  anime: Anime;
  size?: AnimeCardSize;
  isFavorite: boolean;
  onToggle?: (isNowFavorite: boolean) => void;
  showOverlay?: boolean;
}

export default function AnimeCard({
  anime,
  size = "medium",
  showOverlay = true,
  isFavorite = false,
  onToggle = () => {},
}: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const sizeClass = cardSizeClasses[size];
  const textSizes = cardTextSizes[size];

  // Ajustar sizes según el tamaño de la carta
  const imageSizes = {
    small:
      "(max-width: 380px) 35vw, (max-width: 480px) 28vw, (max-width: 640px) 22vw, (max-width: 768px) 18vw, (max-width: 1024px) 15vw, 12vw",
    medium:
      "(max-width: 380px) 45vw, (max-width: 480px) 35vw, (max-width: 640px) 28vw, (max-width: 768px) 22vw, (max-width: 1024px) 18vw, 15vw",
    large:
      "(max-width: 380px) 85vw, (max-width: 480px) 70vw, (max-width: 640px) 55vw, (max-width: 768px) 45vw, (max-width: 1024px) 35vw, 25vw",
  };

  return (
    <div
      data-testid="anime-card"
      className={`rounded ${sizeClass} w-full transition-opacity p-2`}
    >
      <Link
        href={`/anime/${anime.id}`}
        prefetch={true}
        className="relative inline-block h-full w-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {anime.coverUrl ? (
          <Image
            src={anime.coverUrl}
            alt={anime.title}
            fill
            className={clsx(
              "relative h-full rounded w-full object-cover",
              "transition-all duration-600"
            )}
            sizes={imageSizes[size]}
          />
        ) : null}

        <div className="absolute bottom-0 w-full h-full z-20 transition-all duration-600 content-end">
          {/* Overlay base */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b"></div>

          {/* Icono de favorito */}
          <div className="absolute top-2 right-2 z-40">
            <FavoriteIcon isFavorite={isFavorite} onToggle={onToggle} />
          </div>

          {/* Información básica siempre visible */}
          <section className="mx-2 mb-5 mr-14 relative z-30">
            <p
              className={`text-white font-extralight ${textSizes.title} truncate drop-shadow-lg`}
              title={anime.title}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
              }}
            >
              {anime.title}
            </p>
            <p className={`text-gray-400 ${textSizes.subtitle} drop-shadow-md`}>
              {anime.year}
              {anime.genres && anime.genres.length > 0
                ? ` • ${anime.genres[0]}`
                : ""}
            </p>
          </section>

          {/* Overlay completo en hover */}
          {showOverlay && (
            <AnimeCardOverlay anime={anime} isVisible={isHovered} size={size} />
          )}
        </div>
      </Link>
    </div>
  );
}
