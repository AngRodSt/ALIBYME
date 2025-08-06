"use client";
import React, { useState } from "react";
import { PlayCircleIcon } from "lucide-react";

interface TrailerButtonProps {
  trailer?: {
    site: string;
    thumbnail: string;
    id: string;
  };
}

export default function TrailerButton({ trailer }: TrailerButtonProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!trailer) return null;

  return (
    <>
      {/* Trailer Button */}
      <button
        type="button"
        onClick={() => setShowTrailer(true)}
        className="relative flex w-32 h-12 rounded-full overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 justify-center gap-2 items-center group"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${trailer.thumbnail}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
        <p className="relative font-light text-sm text-white z-10">Trailer</p>
        <PlayCircleIcon
          color="white"
          size={24}
          className="relative z-10 transition-all duration-200 hover:scale-110 hover:stroke-red-400"
        />
      </button>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 z-10 bg-black/70 rounded-full p-2 text-white hover:bg-black/90 transition-colors"
              aria-label="Close trailer"
            >
              ✕
            </button>
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              {trailer.site === "youtube" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.id}?autoplay=1&mute=1`}
                  title="Anime Trailer"
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">Trailer not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
