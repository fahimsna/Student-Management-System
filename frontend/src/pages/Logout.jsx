import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    // Prevent returning to authenticated pages with browser back
    navigate("/login", { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
    >
      <LogOut size={17} />
      <span>Logout</span>
    </button>
  );
}
