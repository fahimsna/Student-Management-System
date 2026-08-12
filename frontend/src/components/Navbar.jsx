import React from "react";
import { Menu, X, GraduationCap } from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              text-slate-500
              transition-all duration-200
              hover:bg-slate-100
              hover:text-slate-900
              md:hidden
            "
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X size={21} strokeWidth={2} />
            ) : (
              <Menu size={21} strokeWidth={2} />
            )}
          </button>

          {/* Mobile brand */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <GraduationCap size={19} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-slate-900">
                StudentMS
              </p>

              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Management System
              </p>
            </div>
          </div>

          {/* Desktop page branding */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
              <GraduationCap size={19} />
            </div>

            <div className="leading-none">
              <p className="text-[15px] font-bold tracking-tight text-slate-900">
                StudentMS
              </p>

              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Student Management System
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden h-9 w-px bg-slate-200 sm:block" />

          <div className="hidden rounded-xl px-3 py-2 text-right sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Student Management
            </p>

            <p className="mt-0.5 text-xs font-semibold text-slate-700">
              Dashboard
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
