"use client";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <div className="focus-within:ring-2 focus-within:ring-[#DB372D] focus-within:border-[#DB372D] flex gap-2 backdrop-blur-md bg-white/10 rounded-2xl p-2 shadow-md items-center w-64 transition">
      <Search />
      <input
        type="text"
        placeholder="Search your favorite anime"
        className="bg-transparent outline-none w-full text-white placeholder-gray-100"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="text-gray-100 hover:text-red-400 transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
