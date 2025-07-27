"use client";

import { useUserStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";
import PreferencesModal from "../ui/Modals/Preferences";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const supabase = createClient();
  const init = useUserStore((s) => s.init);
  const showPreferences = useUserStore((s) => s.preferencesModal);
  const setPreferencesModal = useUserStore((s) => s.setPreferencesModal);

  useEffect(() => {
    init(supabase);
  }, [init, supabase]);

  return (
    <>
      {children}
      {showPreferences && (
        <PreferencesModal onSaved={() => setPreferencesModal(false)} />
      )}
    </>
  );
}
