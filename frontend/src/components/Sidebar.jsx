import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardCheck,
  ClipboardList,
  BarChart3,
  FilePlus2,
  ListChecks,
  GraduationCap,
  UserCircle,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const [attendanceOpen, setAttendanceOpen] = useState(true);
  const [marksOpen, setMarksOpen] = useState(true);

  const closeSidebar = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    closeSidebar();
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600 shadow-sm"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  const iconClass = (isActive) =>
    `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
    }`;

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed left-0 top-16 z-50
          flex h-[calc(100vh-4rem)] w-65
          flex-col
          border-r border-slate-200
          bg-white
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-16
          lg:z-30
          lg:h-[calc(100vh-4rem)]
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ===================================================
            MOBILE HEADER
        ==================================================== */}

        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <GraduationCap size={17} />
            </div>

            <span className="text-sm font-bold text-slate-800">StudentMS</span>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {/* =================================================
              MAIN MENU
          ================================================== */}

          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Main Menu
          </p>

          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={navItemClass}
          >
            {({ isActive }) => (
              <>
                <span className={iconClass(isActive)}>
                  <LayoutDashboard size={17} />
                </span>

                <span>Dashboard</span>
              </>
            )}
          </NavLink>

          {/* =================================================
              STUDENTS
          ================================================== */}

          <div className="mt-7">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Students
            </p>

            <div className="space-y-1">
              <NavLink
                to="/students"
                onClick={closeSidebar}
                className={navItemClass}
              >
                {({ isActive }) => (
                  <>
                    <span className={iconClass(isActive)}>
                      <Users size={17} />
                    </span>

                    <span>Students</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/students/add"
                onClick={closeSidebar}
                className={navItemClass}
              >
                {({ isActive }) => (
                  <>
                    <span className={iconClass(isActive)}>
                      <UserPlus size={17} />
                    </span>

                    <span>Add Student</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>

          {/* =================================================
              ATTENDANCE DROPDOWN
          ================================================== */}

          <div className="mt-7">
            <button
              type="button"
              onClick={() => setAttendanceOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <ClipboardCheck size={17} />
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  Attendance
                </span>
              </div>

              <ChevronDown
                size={17}
                className={`text-slate-400 transition-transform duration-200 ${
                  attendanceOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {attendanceOpen && (
              <div className="mt-1 space-y-1 border-l border-slate-200 ml-7 pl-3">
                <NavLink
                  to="/attendance/take"
                  onClick={closeSidebar}
                  className={navItemClass}
                >
                  {({ isActive }) => (
                    <>
                      <span className={iconClass(isActive)}>
                        <ClipboardCheck size={16} />
                      </span>

                      <span>Take Attendance</span>
                    </>
                  )}
                </NavLink>

                <NavLink
                  to="/attendance/records"
                  onClick={closeSidebar}
                  className={navItemClass}
                >
                  {({ isActive }) => (
                    <>
                      <span className={iconClass(isActive)}>
                        <ClipboardList size={16} />
                      </span>

                      <span>Attendance Records</span>
                    </>
                  )}
                </NavLink>

                <NavLink
                  to="/attendance/report"
                  onClick={closeSidebar}
                  className={navItemClass}
                >
                  {({ isActive }) => (
                    <>
                      <span className={iconClass(isActive)}>
                        <BarChart3 size={16} />
                      </span>

                      <span>Attendance Report</span>
                    </>
                  )}
                </NavLink>
              </div>
            )}
          </div>

          {/* =================================================
              MARKS & RESULTS DROPDOWN
          ================================================== */}

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setMarksOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <BarChart3 size={17} />
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  Marks & Results
                </span>
              </div>

              <ChevronDown
                size={17}
                className={`text-slate-400 transition-transform duration-200 ${
                  marksOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {marksOpen && (
              <div className="mt-1 space-y-1 border-l border-slate-200 ml-7 pl-3">
                {/* Add Marks */}

                <NavLink
                  to="/marks/add"
                  onClick={closeSidebar}
                  className={navItemClass}
                >
                  {({ isActive }) => (
                    <>
                      <span className={iconClass(isActive)}>
                        <FilePlus2 size={16} />
                      </span>

                      <span>Add Marks</span>
                    </>
                  )}
                </NavLink>

                {/* Marks Records */}

                <NavLink
                  to="/marks/records"
                  onClick={closeSidebar}
                  className={navItemClass}
                >
                  {({ isActive }) => (
                    <>
                      <span className={iconClass(isActive)}>
                        <ListChecks size={16} />
                      </span>

                      <span>Marks Records</span>
                    </>
                  )}
                </NavLink>

                {/* Result Report */}

                <NavLink
                  to="/marks/report"
                  onClick={closeSidebar}
                  className={navItemClass}
                >
                  {({ isActive }) => (
                    <>
                      <span className={iconClass(isActive)}>
                        <BarChart3 size={16} />
                      </span>

                      <span>Result Report</span>
                    </>
                  )}
                </NavLink>
              </div>
            )}
          </div>

          {/* =================================================
              ACCOUNT
          ================================================== */}

          <div className="mt-7 pb-5">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Account
            </p>

            <div className="space-y-1">
              <NavLink
                to="/profile"
                onClick={closeSidebar}
                className={navItemClass}
              >
                {({ isActive }) => (
                  <>
                    <span className={iconClass(isActive)}>
                      <UserCircle size={17} />
                    </span>

                    <span>Profile</span>
                  </>
                )}
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-red-100 group-hover:text-red-600">
                  <LogOut size={17} />
                </span>

                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>

        {/* ===================================================
            SIDEBAR FOOTER
        ==================================================== */}

        <div className="border-t border-slate-100 px-4 py-3">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <GraduationCap size={16} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-700">
                StudentMS
              </p>

              <p className="truncate text-[10px] text-slate-400">
                Student Management System
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
