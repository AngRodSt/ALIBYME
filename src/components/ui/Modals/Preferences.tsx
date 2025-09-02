import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/client";

const GENRES = [
  "Shonen",
  "Adventure",
  "Romance",
  "Action",
  "Fantasy",
  "Comedy",
  "Drama",
  "Slice of Life",
  "Horror",
  "Sci-Fi",
  "Sports",
  "Mystery",
];

export default function PreferencesModal({ onSaved }: { onSaved: () => void }) {
  const [selectedGenres, setSelectedGenres] = useState([
    "Shonen",
    "Adventure",
    "Romance",
    "Action",
    "Fantasy",
  ]);
  const supabase = createClient();
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from("users")
      .update({ preferences: JSON.stringify(selectedGenres) })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      setError("Error saving preferences. Please try again.");
    } else {
      onSaved();
    }
  };
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full relative rounded-xl shadow-xl py-10 mx-auto px-6 bg-[#0D0D0D]/90">
        {/* Logo and Step */}
        <div className="flex items-center justify-between mb-4">
          <section className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              src="/icons/AlibymeLogo.png"
              alt="Alibyme Logo"
              priority
            />
            <Link href="/">
              <h1 className="text-2xl cursor-pointer text-white">ALIBYME</h1>
            </Link>
          </section>
          <span className="text-white/70 text-sm">2/2</span>
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-white text-2xl font-bold text-center mb-2">
          Just One More Step
        </h2>
        <p className="text-center text-gray-300 mb-6 text-sm">
          Select your favorite genres to receive personal recommendations.
        </p>

        {/* Genres Selection */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 bg-black/60 rounded-lg p-3 min-h-[64px] max-h-32 overflow-y-auto">
            {GENRES.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => handleGenreToggle(genre)}
                className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors duration-150 ${
                  selectedGenres.includes(genre)
                    ? "bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white border-transparent"
                    : "bg-black/40 text-white/70 border-white/20 hover:bg-white/10"
                }`}
              >
                {selectedGenres.includes(genre) ? "✕ " : ""}
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Save Preferences Button */}
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}
        <button
          onClick={handleSave}
          disabled={loading || selectedGenres.length === 0}
          className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-transform duration-200 mb-2
            ${
              loading || selectedGenres.length === 0
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white hover:scale-105"
            }`}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
