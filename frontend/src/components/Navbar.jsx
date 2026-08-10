import React from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="w-full h-16 bg-[#343A40] text-white shadow-md relative z-50">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger - Mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md text-[#E9ECEF] hover:bg-[#495057] transition duration-200"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">SMS</div>
        </div>

        {/* Welcome */}
        <div>
          <span className="text-sm sm:text-base text-[#E9ECEF]">Welcome</span>
        </div>
      </div>
    </nav>
  );
}
