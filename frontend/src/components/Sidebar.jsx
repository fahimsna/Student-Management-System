import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../pages/Logout";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-[#495057] text-white flex flex-col justify-between shadow-md">
      {/* Navigation */}
      <div className="p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-md transition duration-200 ${
              isActive
                ? "bg-[#495057] text-white"
                : "text-[#CED4DA] hover:bg-[#495057] hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-md transition duration-200 ${
              isActive
                ? "bg-[#495057] text-white"
                : "text-[#CED4DA] hover:bg-[#495057] hover:text-white"
            }`
          }
        >
          Students
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-md transition duration-200 ${
              isActive
                ? "bg-[#495057] text-white"
                : "text-[#CED4DA] hover:bg-[#495057] hover:text-white"
            }`
          }
        >
          Profile
        </NavLink>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-[#495057]">
        <Logout />
      </div>
    </aside>
  );
}
