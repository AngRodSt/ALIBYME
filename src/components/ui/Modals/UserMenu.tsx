import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { ChevronDown, LogOut, UserIcon, Settings } from "lucide-react";
import Link from "next/link";

export default function UserMenu({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      className={`relative sm:w-72 w-64 bg-gradient-to-r from-[#DB372D] to-[#BD2D69] rounded-2xl focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 ${
        open ? "pb-4" : ""
      }`}
      ref={menuRef}
    >
      <button
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 p-2 sm:w-72 w-64 bg-gradient-to-r from-[#DB372D] to-[#BD2D69] rounded-2xl "
        aria-label="Abrir menú de usuario"
      >
        <Image
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.full_name || user.email}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-white ">
          {user.user_metadata.full_name || user.email}
        </span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute right-0 w-64 sm:w-72  bg-gradient-to-r from-[#DB372D] to-[#BD2D69] backdrop-blur-lg rounded-b-xl shadow-2xl py-4 z-[9999] overflow-hidden">
          {/* Menu Options */}
          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:text-white hover:bg-white/30 transition-all duration-200 group"
            >
              <UserIcon
                size={18}
                className="text-white group-hover:text-white transition-colors"
              />
              <span>My Profile</span>
            </Link>

            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:text-white hover:bg-white/30 transition-all duration-200 group">
              <Settings
                size={18}
                className="text-white group-hover:text-white transition-colors"
              />
              <span>Settings</span>
            </button>

            <div className="border-t border-white/10 mt-2 pt-2">
              <button
                onClick={onLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:text-red-900 hover:bg-red-400/50 transition-all duration-200 group"
              >
                <LogOut
                  size={18}
                  className="text-white group-hover:text-red-900 transition-colors"
                />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
