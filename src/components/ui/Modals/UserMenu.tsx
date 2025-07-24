import { useState } from "react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";

export default function UserMenu({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#DB372D]"
        aria-label="Abrir menú de usuario"
      >
        <Image
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.full_name || user.email}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-white font-medium">
          {user.user_metadata.full_name || user.email}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-black/90 rounded shadow-lg py-2 z-50 min-w-[160px]">
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-black/70"
          >
            Cerrar sesión
          </button>
          {/* Aquí puedes agregar más opciones, como "Perfil", "Preferencias", etc. */}
        </div>
      )}
    </div>
  );
}
