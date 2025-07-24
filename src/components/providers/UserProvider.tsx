"use client";

import { useUserStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import PreferencesModal from "../ui/Modals/Preferences";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const supabase = createClient();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Fetch the current user from Supabase and update the user store
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));

    // Listen for authentication state changes (login, logout, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Update the user store whenever the auth state changes
        setUser(session?.user || null);
      }
    );
    return () => listener?.subscription.unsubscribe();
  }, [supabase, setUser]);

  useEffect(() => {
    if (user) {
      supabase
        .from("users")
        .select("preferences")
        .eq("id", user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error("Error al leer preferences:", error);
            return;
          }
          setShowPreferences(!data?.preferences);
        });
    } else {
      setShowPreferences(false);
    }
  }, [user, supabase]);

  return (
    <>
      {children}
      {showPreferences && (
        <PreferencesModal onSaved={() => setShowPreferences(false)} />
      )}
    </>
  );
}
