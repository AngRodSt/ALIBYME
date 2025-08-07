"use client";
import React, { useEffect, useState } from "react";
import { Bookmark, Eye, Check, ChevronDown, X } from "lucide-react";
import { UserAnimeStatus } from "@/models/Anime";
import { useUserStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/client";

interface WatchStatusSelectorProps {
  animeId: number;
  className?: string;
}

export default function WatchStatusSelector({
  animeId,
  className = "",
}: WatchStatusSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Select Status");

  const user = useUserStore((state) => state.user);
  const statuses = useUserStore((state) => state.statuses);
  const updateStatus = useUserStore((state) => state.updateAnimeStatus);
  const removeStatus = useUserStore((state) => state.removeAnimeStatus);
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      setSelectedStatus("Select Status");
      return;
    }
    const userStatus = statuses.find((status) => status.anime_id === animeId);
    if (userStatus) {
      setSelectedStatus(userStatus.status);
    } else {
      setSelectedStatus("Select Status");
    }
  }, [statuses, user, animeId]);

  const statusOptions = [
    { label: "To Watch", icon: Bookmark, value: "to-watch" },
    { label: "Watching", icon: Eye, value: "watching" },
    { label: "Watched", icon: Check, value: "watched" },
  ];

  const currentStatus = statusOptions.find(
    (option) => option.label === selectedStatus
  );

  const handleStatusChange = (status: UserAnimeStatus["status"]) => {
    if (!user) return;
    if (status === "Select Status") return;
    updateStatus(animeId, status, user.id, supabase);
  };

  const handleRemoveStatus = () => {
    if (!user) return;
    removeStatus(animeId, user.id, supabase);
  };

  const getButtonClass = (status: string) => {
    return `flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
      selectedStatus === status
        ? "bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white hover:shadow-lg"
        : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
    }`;
  };

  const renderRemoveButton = () => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleRemoveStatus();
      }}
      className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
    >
      <X size={16} />
    </div>
  );

  return (
    <section
      className={`flex gap-4 mt-15 justify-center lg:justify-start flex-wrap ${className}`}
    >
      {/* Desktop - Show all buttons */}
      <div className="hidden md:flex gap-4 flex-wrap">
        <button
          className={getButtonClass("To Watch")}
          onClick={() => handleStatusChange("To Watch")}
        >
          <Bookmark size={20} />
          To Watch
          {selectedStatus === "To Watch" && renderRemoveButton()}
        </button>

        <button
          className={getButtonClass("Watching")}
          onClick={() => handleStatusChange("Watching")}
        >
          <Eye size={20} />
          Watching
          {selectedStatus === "Watching" && renderRemoveButton()}
        </button>

        <button
          className={getButtonClass("Watched")}
          onClick={() => handleStatusChange("Watched")}
        >
          <Check size={20} />
          Watched
          {selectedStatus === "Watched" && renderRemoveButton()}
        </button>
      </div>

      {/* Mobile - Dropdown */}
      <div className="md:hidden relative w-full max-w-xs">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between gap-2 bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center gap-2">
            {currentStatus && <currentStatus.icon size={20} />}
            {selectedStatus}
            {selectedStatus !== "Select Status" && renderRemoveButton()}
          </div>
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden z-50">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  handleStatusChange(option.label as UserAnimeStatus["status"]);
                  setIsDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-white/10 ${
                  selectedStatus === option.label
                    ? "bg-white/20 text-white"
                    : "text-gray-300"
                }`}
              >
                <option.icon size={18} />
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
