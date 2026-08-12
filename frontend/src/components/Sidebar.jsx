import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../pages/Logout";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-16 md:top-0
          left-0
          z-50
          w-64
          h-[calc(100vh-4rem)]
          md:h-auto
          md:min-h-full
          bg-[#495057]
          text-white
          flex flex-col justify-between
          shadow-md
          transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Navigation */}
        <div className="p-4 space-y-2">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-md transition duration-200 ${
                isActive
                  ? "bg-[#343A40] text-white"
                  : "text-[#CED4DA] hover:bg-[#343A40] hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          {/* Students */}
          <NavLink
            to="/students"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-md transition duration-200 ${
                isActive
                  ? "bg-[#343A40] text-white"
                  : "text-[#CED4DA] hover:bg-[#343A40] hover:text-white"
              }`
            }
          >
            Students
          </NavLink>

          {/* Add Student */}
          <NavLink
            to="/add-student"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-md transition duration-200 ${
                isActive
                  ? "bg-[#343A40] text-white"
                  : "text-[#CED4DA] hover:bg-[#343A40] hover:text-white"
              }`
            }
          >
            Add Student
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-md transition duration-200 ${
                isActive
                  ? "bg-[#343A40] text-white"
                  : "text-[#CED4DA] hover:bg-[#343A40] hover:text-white"
              }`
            }
          >
            Profile
          </NavLink>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-[#6C757D]">
          <Logout />
        </div>
      </aside>
    </>
  );
}
