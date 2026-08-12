import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="flex min-h-14 items-center justify-center px-5 py-3 text-center">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Student Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
