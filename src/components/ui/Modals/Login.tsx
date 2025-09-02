"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { CircleAlert, LoaderCircle } from "lucide-react";

import { createClient } from "@/utils/supabase/client";

interface LoginPageProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function LoginPage({ isOpen, onClose }: LoginPageProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setError("There was an error logging in with Google. Please try again.");
      console.error("Error loging in with Google:", error);
      setIsGoogleLoading(false);
    }
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <div className="max-w-lg relative rounded-xl shadow-xl py-20 mx-auto px-10 bg-[#0D0D0D]/90">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black/90 hover:scale-105 transition-transform duration-200 rounded-full flex items-center justify-center  border border-white/20 z-10"
        >
          <span className="text-white text-lg">✕</span>
        </button>
        <section className="flex items-center gap-2 justify-center">
          <Image
            width={40}
            height={40}
            src="/icons/AlibymeLogo.png"
            alt="Alibyme Logo"
            priority
          />
          <Link href="/">
            <h1 className="text-2xl  text-white cursor-pointer">ALIBYME</h1>
          </Link>
        </section>

        <div className="text-center mb-8">
          <p className="mt-2 text-muted-foreground text-white">
            Login to your account to continue
          </p>
        </div>

        {error && (
          <div className="rounded-md border px-4 py-3">
            <p className="text-sm">
              <CircleAlert
                className="me-3 -mt-0.5 inline-flex text-red-500"
                size={16}
                aria-hidden="true"
              />
              {error}
            </p>
          </div>
        )}

        <button
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-transform hover:scale-105 ease-in-out duration-200`}
          onClick={loginWithGoogle}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <LoaderCircle className="animate-spin size-5 text-blue-500" />
          ) : (
            <GoogleIcon />
          )}
          <span className="font-medium text-gray-700">
            Iniciar sesión con Google
          </span>
        </button>
      </div>
    </div>
  );
}

const GoogleIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="size-5"
  >
    <path
      fill="#fbc02d"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#e53935"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4caf50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1565c0"
      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);
