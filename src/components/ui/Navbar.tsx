import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-gray-300 pt-5 ">
      <nav className="container mx-auto mb-5 flex justify-around content-center align-middle text-center items-center text-white">
        {/* Logo */}
        <section className="">
          <h1>ALIBYME</h1>
        </section>
        <section>
          <nav className="flex gap-5">
            <Link href={"/"}>Home</Link>
            <Link href={"/catalog"}>Catalog</Link>
          </nav>
        </section>
        <section>
          {/*SearchBar*/}
          <button className="py-2 bg-white/50 backdrop-blur-2xl text-white px-2 rounded-2xl">
            Search your favorite anime
          </button>
        </section>
        <section>
          <button className="py-2 bg-gradient-to-r from-gray-400 to-gray-700 text-white px-2 rounded-2xl font-semibold">
            Create Your List -- Start Now!
          </button>
        </section>
      </nav>
    </div>
  );
}
