import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-[#343A40] text-white shadow-md">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">SMS</div>

        {/* Welcome */}
        <div>
          <span className="text-sm sm:text-base text-[#E9ECEF]">Welcome</span>
        </div>
      </div>
    </nav>
  );
}
