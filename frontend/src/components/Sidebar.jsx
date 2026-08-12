import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Logout from "../pages/Logout";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/students",
      icon: Users,
    },
    {
      name: "Add Student",
      path: "/add-student",
      icon: UserPlus,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-[72px] z-50
          flex h-[calc(100vh-72px)] w-[250px]
          flex-col
          border-r border-slate-200
          bg-white

          shadow-[8px_0_30px_rgba(15,23,42,0.04)]

          transition-transform duration-300 ease-out

          md:static
          md:h-auto
          md:min-h-[calc(100vh-72px)]
          md:translate-x-0
          md:shadow-none

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          {/* Section title */}
          <div className="mb-4 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Main Menu
            </p>
          </div>

          {/* Menu */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    group relative flex items-center gap-3
                    rounded-xl
                    px-3 py-2.5
                    text-sm font-semibold
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue-600" />
                      )}

                      {/* Icon */}
                      <span
                        className={`
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-lg
                          transition-all duration-200

                          ${
                            isActive
                              ? "bg-white text-blue-600 shadow-sm"
                              : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-slate-700"
                          }
                        `}
                      >
                        <Icon size={18} strokeWidth={2} />
                      </span>

                      {/* Text */}
                      <span className="flex-1">{item.name}</span>

                      {/* Arrow */}
                      <ChevronRight
                        size={15}
                        className={`
                          transition-all duration-200

                          ${
                            isActive
                              ? "text-blue-400"
                              : "text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }
                        `}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-slate-100 p-4">
          <div className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-red-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition group-hover:bg-white">
              <LogOut size={17} />
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                Account
              </p>

              <div className="mt-0.5 text-sm font-semibold text-slate-600 group-hover:text-red-600">
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
