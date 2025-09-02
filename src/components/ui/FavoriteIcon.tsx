import { useState } from "react";
import clsx from "clsx";
import { useUserStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/client";
import { AnimeById, Anime } from "@/models/Anime";

interface FavoriteIconProps {
  anime: AnimeById | Anime;
  className?: string;
  size?: number;
  // Legacy props for backward compatibility
  isFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
}

export default function FavoriteIcon({
  anime,
  className = "",
  size = 20,
  // Legacy props
  isFavorite: legacyIsFavorite,
  onToggle: legacyOnToggle,
}: FavoriteIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { user, favorites, addFavorite, removeFavorite } = useUserStore();
  const supabase = createClient();

  // Use legacy props if provided (for backward compatibility), otherwise use internal logic
  const isUsingLegacyApi =
    legacyIsFavorite !== undefined && legacyOnToggle !== undefined;

  const isFavorite = isUsingLegacyApi
    ? legacyIsFavorite
    : favorites.some((fav) => fav.anime_id === anime.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUsingLegacyApi) {
      // Use legacy API
      legacyOnToggle?.(!legacyIsFavorite);
    } else {
      // Use internal logic
      if (!user || !anime) return;

      if (isFavorite) {
        removeFavorite(anime, user.id, supabase);
      } else {
        addFavorite(anime, user.id, supabase);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "p-2 rounded-full bg-black/30 backdrop-blur-sm transition-all duration-300",
        "hover:bg-black/50 hover:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-white/50",
        className
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={isFavorite ? "#ef4444" : "none"}
          stroke={isFavorite ? "#ef4444" : "white"}
          strokeWidth="2"
          className={clsx(
            "transition-all duration-300",
            isHovered && !isFavorite && "stroke-red-400"
          )}
        />
      </svg>
    </button>
  );
}
