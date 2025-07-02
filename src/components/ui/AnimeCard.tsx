import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { Anime } from "@/models/Anime";

export default function ProductCard({ anime }: { anime: Anime }) {
  return (
    <div className="aspect-square max-w-70 max-h-90 p-3 bg-white transition-opacity">
      <Link
        href={`/anime/${anime.id}`}
        prefetch={true}
        className="relative inline-block h-full w-full"
      >
        <div
          className={clsx(
            "group flex h-full w-full items-center justify-center overflow-hidden relative"
          )}
        >
          {anime.coverUrl ? (
            <Image
              src={anime.coverUrl}
              alt={anime.title}
              fill
              className={clsx(
                "relative h-full py-2 w-full object-contain",
                "hover:scale-105 transition-all duration-600"
              )}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : null}
        </div>
        <div className="overflow-hidden w-full"></div>
      </Link>
    </div>
  );
}
