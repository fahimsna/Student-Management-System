import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  CalendarDays,
  ArrowUpRight,
  ArrowRight,
  Activity,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getStudent } from "../api/studentApi";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getStudent();

        setStudents(result.data.students || []);
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message || "Failed to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // ============================================================
  // STUDENT STATISTICS
  // ============================================================

  const activeStudents = useMemo(() => {
    return students.filter((student) => student.status === "Active").length;
  }, [students]);

  const inactiveStudents = useMemo(() => {
    return students.filter((student) => student.status === "Inactive").length;
  }, [students]);

  const newStudents = useMemo(() => {
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return students.filter((student) => {
      if (!student.createdAt) {
        return false;
      }

      const createdDate = new Date(student.createdAt);

      return createdDate >= thirtyDaysAgo;
    }).length;
  }, [students]);

  // ============================================================
  // RECENT STUDENTS
  // ============================================================

  const recentStudents = useMemo(() => {
    return [...students]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5);
  }, [students]);

  // ============================================================
  // DATE
  // ============================================================

  const today = new Date();

  const formattedToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ============================================================
  // STATISTICS
  // ============================================================

  const statistics = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "All registered students",
    },
    {
      title: "Active Students",
      value: activeStudents,
      icon: UserCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      description: "Currently active",
    },
    {
      title: "New Students",
      value: newStudents,
      icon: UserPlus,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      description: "Added in last 30 days",
    },
    {
      title: "Inactive Students",
      value: inactiveStudents,
      icon: UserX,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      description: "Currently inactive",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fc] text-slate-900">
      {/* ========================================================
          NAVBAR
      ========================================================= */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* ========================================================
          MAIN APPLICATION LAYOUT
      ========================================================= */}
      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* ======================================================
            CONTENT
        ======================================================= */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-7xl">
              {/* ==================================================
                  PAGE HEADER
              =================================================== */}
              <div className="mb-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />

                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Overview
                      </span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                      Dashboard
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                      Monitor your students, manage records, and keep attendance
                      organized from one place.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => navigate("/students")}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
                    >
                      View students
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/attendance")}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10"
                    >
                      <ClipboardCheck size={16} />
                      Take attendance
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  ERROR
              =================================================== */}
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              )}

              {/* ==================================================
                  STATISTICS
              =================================================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statistics.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.title}
                      className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            {stat.title}
                          </p>

                          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-900">
                            {loading ? (
                              <span className="inline-block h-9 w-14 animate-pulse rounded-lg bg-slate-100" />
                            ) : (
                              stat.value
                            )}
                          </h2>
                        </div>

                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                        >
                          <Icon size={21} className={stat.iconColor} />
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-400">
                          {stat.description}
                        </p>

                        <ArrowUpRight
                          size={15}
                          className="text-slate-300 transition group-hover:text-slate-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ==================================================
                  ATTENDANCE OVERVIEW
              =================================================== */}
              <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
                {/* Header */}
                <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <ClipboardCheck size={19} />
                      </div>

                      <div>
                        <h2 className="text-base font-bold tracking-tight text-slate-900">
                          Attendance Overview
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {formattedToday}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/attendance")}
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                    >
                      Open attendance
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>

                {/* Attendance body */}
                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
                    {/* Main attendance card */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100/50 blur-2xl" />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                              Today's attendance
                            </p>

                            <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-900">
                              Ready to take attendance
                            </h3>

                            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                              Attendance has not been recorded yet. Start
                              today's attendance session and mark each student's
                              status.
                            </p>
                          </div>

                          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm sm:flex">
                            <ClipboardCheck size={22} />
                          </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => navigate("/attendance")}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white transition hover:bg-blue-600"
                          >
                            <ClipboardCheck size={16} />
                            Take attendance
                          </button>

                          <button
                            type="button"
                            onClick={() => navigate("/attendance")}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                          >
                            View records
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Attendance stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                          <CheckCircle2 size={18} />
                        </div>

                        <p className="mt-4 text-xs font-medium text-slate-400">
                          Present
                        </p>

                        <p className="mt-1 text-xl font-bold text-slate-900">
                          —
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Not recorded
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                          <UserX size={18} />
                        </div>

                        <p className="mt-4 text-xs font-medium text-slate-400">
                          Absent
                        </p>

                        <p className="mt-1 text-xl font-bold text-slate-900">
                          —
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Not recorded
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                          <Users size={18} />
                        </div>

                        <p className="mt-4 text-xs font-medium text-slate-400">
                          Not marked
                        </p>

                        <p className="mt-1 text-xl font-bold text-slate-900">
                          {loading ? "—" : students.length}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          All students
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                          <Clock3 size={18} />
                        </div>

                        <p className="mt-4 text-xs font-medium text-slate-400">
                          Attendance rate
                        </p>

                        <p className="mt-1 text-xl font-bold text-slate-900">
                          —
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Not available yet
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ==================================================
                  RECENT ACTIVITY
              =================================================== */}
              <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
                {/* Section Header */}
                <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Activity size={19} />
                    </div>

                    <div>
                      <h2 className="text-base font-bold tracking-tight text-slate-900">
                        Recent Activity
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Recently added students
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/students")}
                    className="group flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                  >
                    View all
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 px-5 py-5 sm:px-6"
                      >
                        <div className="h-11 w-11 animate-pulse rounded-full bg-slate-100" />

                        <div className="flex-1">
                          <div className="h-3.5 w-32 animate-pulse rounded bg-slate-100" />

                          <div className="mt-2 h-3 w-48 animate-pulse rounded bg-slate-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty */}
                {!loading && recentStudents.length === 0 && (
                  <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                      <Users size={25} className="text-slate-300" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-700">
                      No students yet
                    </h3>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                      Add your first student to start building your student
                      records.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/add-student")}
                      className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-600"
                    >
                      Add student
                    </button>
                  </div>
                )}

                {/* Student List */}
                {!loading && recentStudents.length > 0 && (
                  <div className="divide-y divide-slate-100">
                    {recentStudents.map((student) => (
                      <div
                        key={student._id}
                        className="group flex flex-col gap-4 px-5 py-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                      >
                        {/* Student information */}
                        <div className="flex min-w-0 items-center gap-4">
                          {/* Avatar */}
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                            {student.name
                              ? student.name.charAt(0).toUpperCase()
                              : "S"}
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold text-slate-800">
                              {student.name || "Unnamed student"}
                            </h3>

                            <p className="mt-1 truncate text-xs text-slate-400">
                              {student.email || "No email available"}
                            </p>

                            <p className="mt-1.5 text-[11px] font-medium text-slate-400">
                              {student.department || "No department"}{" "}
                              {student.semester
                                ? `• Semester ${student.semester}`
                                : ""}
                            </p>
                          </div>
                        </div>

                        {/* Right information */}
                        <div className="flex items-center gap-4 pl-15 sm:pl-0">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                            <CalendarDays size={14} />

                            <span>{formatDate(student.createdAt)}</span>
                          </div>

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                              student.status === "Active"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                student.status === "Active"
                                  ? "bg-emerald-500"
                                  : "bg-rose-500"
                              }`}
                            />

                            {student.status || "Unknown"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* ==================================================
                  BOTTOM INFORMATION
              =================================================== */}
              {!loading && students.length > 0 && (
                <div className="mt-5 flex items-center justify-between px-1">
                  <p className="text-xs text-slate-400">
                    Showing the latest {Math.min(recentStudents.length, 5)}{" "}
                    student records
                  </p>

                  <p className="hidden text-xs font-medium text-slate-400 sm:block">
                    {students.length} total{" "}
                    {students.length === 1 ? "student" : "students"}
                  </p>
                </div>
              )}
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
