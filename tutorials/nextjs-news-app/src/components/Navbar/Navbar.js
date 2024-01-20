import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 py-6 px-10 flex justify-between">
      <h4 className="text-white uppercase font-bold">
        <Link href="/"> News App</Link>
      </h4>
    </nav>
  );
}
