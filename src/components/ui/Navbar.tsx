"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed bg-gradient-to-b from-black to-black/50 top-0 left-0 w-full z-50  pt-5">
      <nav className="container mx-auto mb-3 flex justify-between items-center text-white px-4">
        {/* Logo */}
        <section className="flex items-center gap-2">
          <Image
            width={40}
            height={40}
            src="/icons/AlibymeLogo.png"
            alt="Alibyme Logo"
            priority
          />
          <h1 className="text-2xl">ALIBYME</h1>
        </section>

        <section className="hidden lg:flex gap-5 items-center">
          <Link href={"/"}>
            <p className="transition-transform duration-200 hover:scale-105 hover:text-[#DB372D]">
              Home
            </p>
          </Link>
          <Link href={"/catalog"}>
            <p className="transition-transform duration-200 hover:scale-105 hover:text-[#DB372D]">
              Catalog
            </p>
          </Link>
        </section>

        {/* Desktop Nav */}
        <section className="hidden lg:flex gap-5 items-center">
          <SearchBar />
          <button className="py-2 bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white px-2 rounded-2xl font-semibold transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-l">
            Create Your List -- Start Now!
          </button>
        </section>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-gradient-to-t from-black to-black/50 absolute w-full left-0 top-0 z-50
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${
            menuOpen
              ? "max-h-[400px] translate-y-17.5 opacity-100 pointer-events-auto"
              : "max-h-0  translate-y-17.5 pointer-events-none"
          }
        `}
      >
        <div className="flex flex-col items-center gap-4 p-4 text-white">
          <Link href={"/"}>
            <p className="transition-transform duration-200 hover:scale-105 hover:text-[#DB372D]">
              Home
            </p>
          </Link>
          <Link href={"/catalog"}>
            <p className="transition-transform duration-200 hover:scale-105 hover:text-[#DB372D]">
              Catalog
            </p>
          </Link>
          <SearchBar />
          <button className="py-2 bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white px-2 rounded-2xl font-semibold transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-l">
            Create Your List -- Start Now!
          </button>
        </div>
      </div>
    </div>
  );
}
