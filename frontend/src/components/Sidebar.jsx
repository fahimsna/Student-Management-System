import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCircle,
  ChevronRight,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import Logout from "../pages/Logout";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const attendancePaths = [
    "/attendance/take",
    "/attendance/records",
    "/attendance/report",
  ];

  const attendanceActive = attendancePaths.some((path) =>
    location.pathname.startsWith(path),
  );

  const [attendanceOpen, setAttendanceOpen] = useState(attendanceActive);

  const mainMenuItems = [
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
  ];

  const attendanceItems = [
    {
      name: "Take Attendance",
      path: "/attendance/take",
      icon: ClipboardCheck,
    },
    {
      name: "Attendance Records",
      path: "/attendance/records",
      icon: ClipboardList,
    },
    {
      name: "Attendance Report",
      path: "/attendance/report",
      icon: BarChart3,
    },
  ];

  const closeMobileSidebar = () => {
    setSidebarOpen(false);
  };

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

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          md:sticky
          md:top-[72px]
          md:h-[calc(100vh-72px)]
          md:min-h-0
          md:translate-x-0
          md:self-start
          md:shadow-none
        `}
      >
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          {/* Main Menu */}
          <div className="mb-4 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Main Menu
            </p>
          </div>

          <nav className="space-y-1.5">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileSidebar}
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
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue-600" />
                      )}

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

                      <span className="flex-1">{item.name}</span>

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

            {/* Attendance */}
            <button
              type="button"
              onClick={() => setAttendanceOpen((previous) => !previous)}
              className={`
                group relative flex w-full items-center gap-3
                rounded-xl
                px-3 py-2.5
                text-left
                text-sm font-semibold
                transition-all duration-200

                ${
                  attendanceActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              {attendanceActive && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue-600" />
              )}

              <span
                className={`
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  transition-all duration-200

                  ${
                    attendanceActive
                      ? "bg-white text-blue-600 shadow-sm"
                      : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-slate-700"
                  }
                `}
              >
                <ClipboardCheck size={18} strokeWidth={2} />
              </span>

              <span className="flex-1">Attendance</span>

              {attendanceOpen ? (
                <ChevronDown
                  size={16}
                  className={
                    attendanceActive ? "text-blue-400" : "text-slate-300"
                  }
                />
              ) : (
                <ChevronRight
                  size={15}
                  className={
                    attendanceActive ? "text-blue-400" : "text-slate-300"
                  }
                />
              )}
            </button>

            {/* Attendance Submenu */}
            {attendanceOpen && (
              <div className="ml-5 space-y-1 border-l border-slate-200 pl-3">
                {attendanceItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeMobileSidebar}
                      className={({ isActive }) => `
                        group flex items-center gap-2.5
                        rounded-lg
                        px-3 py-2.5
                        text-xs font-semibold
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
                          <span
                            className={`
                              flex h-7 w-7 shrink-0
                              items-center justify-center
                              rounded-md
                              transition-colors

                              ${
                                isActive
                                  ? "bg-white text-blue-600 shadow-sm"
                                  : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-slate-700"
                              }
                            `}
                          >
                            <Icon size={15} strokeWidth={2} />
                          </span>

                          <span className="flex-1">{item.name}</span>

                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Account */}
          <div className="mb-4 mt-8 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Account
            </p>
          </div>

          <nav>
            <NavLink
              to="/profile"
              onClick={closeMobileSidebar}
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
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue-600" />
                  )}

                  <span
                    className={`
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-lg

                      ${
                        isActive
                          ? "bg-white text-blue-600 shadow-sm"
                          : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-slate-700"
                      }
                    `}
                  >
                    <UserCircle size={18} strokeWidth={2} />
                  </span>

                  <span className="flex-1">Profile</span>

                  <ChevronRight
                    size={15}
                    className={
                      isActive
                        ? "text-blue-400"
                        : "text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    }
                  />
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-slate-100 p-4">
          <Logout />
        </div>
      </aside>
    </>
  );
}
