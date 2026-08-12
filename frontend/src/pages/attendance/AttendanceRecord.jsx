import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const API_URL = "http://localhost:8007/api/attendance";

export default function AttendanceRecord() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    date: "",
    department: "",
    semester: "",
  });

  /* =========================================================
     FETCH ATTENDANCE
  ========================================================= */

  const fetchAttendance = async (customFilters = filters) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const params = new URLSearchParams();

      if (customFilters.date) {
        params.append("date", customFilters.date);
      }

      if (customFilters.department) {
        params.append("department", customFilters.department);
      }

      if (customFilters.semester) {
        params.append("semester", customFilters.semester);
      }

      const query = params.toString();

      const response = await fetch(`${API_URL}${query ? `?${query}` : ""}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch attendance records.",
        );
      }

      setAttendance(result.attendance || []);
    } catch (err) {
      console.error("Attendance fetch error:", err);

      setError(err.message || "Failed to fetch attendance records.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchAttendance();
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const handleFilter = (e) => {
    e.preventDefault();
    fetchAttendance(filters);
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    const emptyFilters = {
      date: "",
      department: "",
      semester: "",
    };

    setFilters(emptyFilters);
    fetchAttendance(emptyFilters);
  };

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalRecords = attendance.reduce(
    (total, record) => total + (record.attendance?.length || 0),
    0,
  );

  const presentCount = attendance.reduce(
    (total, record) =>
      total +
      (record.attendance?.filter((item) => item.status === "Present").length ||
        0),
    0,
  );

  const absentCount = attendance.reduce(
    (total, record) =>
      total +
      (record.attendance?.filter((item) => item.status === "Absent").length ||
        0),
    0,
  );

  const lateCount = attendance.reduce(
    (total, record) =>
      total +
      (record.attendance?.filter((item) => item.status === "Late").length || 0),
    0,
  );

  const attendancePercentage =
    totalRecords > 0 ? ((presentCount / totalRecords) * 100).toFixed(1) : "0.0";

  /* =========================================================
     DATE FORMATTER
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <div className="relative z-[100]">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* =====================================================
          PAGE LAYOUT
      ====================================================== */}

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main column */}

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-7xl">
              {/* =================================================
                  PAGE HEADER
              ================================================== */}

              <div className="mb-7">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Attendance management
                  </span>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                      Attendance Records
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      View, filter, and monitor student attendance history.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Attendance rate
                    </p>

                    <p className="mt-1 text-xl font-black text-slate-900">
                      {attendancePercentage}%
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  STATISTICS
              ================================================== */}

              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total Records"
                  value={totalRecords}
                  icon="📋"
                  iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                  title="Present"
                  value={presentCount}
                  icon="✓"
                  iconClass="bg-emerald-50 text-emerald-600"
                />

                <StatCard
                  title="Absent"
                  value={absentCount}
                  icon="×"
                  iconClass="bg-red-50 text-red-600"
                />

                <StatCard
                  title="Late"
                  value={lateCount}
                  icon="◷"
                  iconClass="bg-amber-50 text-amber-600"
                />
              </div>

              {/* =================================================
                  FILTER CARD
              ================================================== */}

              <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <span className="text-lg">⌕</span>
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        Filter Records
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Search attendance by date, department, or semester.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleFilter}
                  className="grid grid-cols-1 gap-5 px-5 py-6 sm:px-7 md:grid-cols-2 xl:grid-cols-4"
                >
                  {/* Date */}

                  <div>
                    <label
                      htmlFor="attendance-date"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Date
                    </label>

                    <input
                      id="attendance-date"
                      type="date"
                      value={filters.date}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          date: e.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  {/* Department */}

                  <div>
                    <label
                      htmlFor="attendance-department"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Department
                    </label>

                    <select
                      id="attendance-department"
                      value={filters.department}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          department: e.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="">All Departments</option>

                      <option value="CSE">CSE</option>
                      <option value="EEE">EEE</option>
                      <option value="BBA">BBA</option>
                      <option value="English">English</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Semester */}

                  <div>
                    <label
                      htmlFor="attendance-semester"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Semester / Class
                    </label>

                    <select
                      id="attendance-semester"
                      value={filters.semester}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          semester: e.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="">All Semesters</option>

                      {Array.from({ length: 12 }, (_, index) => (
                        <option key={index + 1} value={String(index + 1)}>
                          Semester {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}

                  <div className="flex items-end gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-11 flex-1 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "Searching..." : "Search"}
                    </button>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </section>

              {/* =================================================
                  ERROR
              ================================================== */}

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />

                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {/* =================================================
                  RECORDS CARD
              ================================================== */}

              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                {/* Header */}

                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        Attendance History
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        {attendance.length} attendance session
                        {attendance.length !== 1 ? "s" : ""} found.
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Sessions
                      </span>

                      <span className="ml-2 text-sm font-black text-slate-700">
                        {attendance.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    LOADING
                ================================================== */}

                {loading ? (
                  <LoadingState />
                ) : attendance.length === 0 ? (
                  /* =================================================
                     EMPTY
                  ================================================== */

                  <EmptyState />
                ) : (
                  /* =================================================
                     RECORD LIST
                  ================================================== */

                  <div className="divide-y divide-slate-100">
                    {attendance.map((record) => (
                      <AttendanceSession
                        key={record._id}
                        record={record}
                        formatDate={formatDate}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </main>

          {/* =====================================================
              FOOTER
          ====================================================== */}

          <Footer />
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   STAT CARD
============================================================= */

function StatCard({ title, value, icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   LOADING STATE
============================================================= */

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

      <p className="mt-4 text-sm font-semibold text-slate-600">
        Loading attendance records...
      </p>

      <p className="mt-1 text-xs text-slate-400">Please wait a moment.</p>
    </div>
  );
}

/* =============================================================
   EMPTY STATE
============================================================= */

function EmptyState() {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
        📋
      </div>

      <h3 className="mt-5 text-base font-bold text-slate-800">
        No attendance records
      </h3>

      <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-400">
        No attendance records match your current filters. Once attendance is
        saved, your records will appear here.
      </p>
    </div>
  );
}

/* =============================================================
   ATTENDANCE SESSION
============================================================= */

function AttendanceSession({ record, formatDate }) {
  const records = record.attendance || [];

  const total = records.length;

  const present = records.filter((item) => item.status === "Present").length;

  const absent = records.filter((item) => item.status === "Absent").length;

  const late = records.filter((item) => item.status === "Late").length;

  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : "0.0";

  return (
    <div className="p-5 transition hover:bg-slate-50/50 sm:p-7">
      {/* =======================================================
          SESSION TOP
      ======================================================== */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        {/* Session info */}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">
              {record.department || "Department"}
            </h3>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
              Semester {record.semester || "—"}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span>Attendance date</span>

            <span className="text-slate-300">•</span>

            <span className="font-semibold text-slate-500">
              {formatDate(record.date)}
            </span>
          </div>
        </div>

        {/* Session stats */}

        <div className="grid grid-cols-4 gap-4 rounded-xl bg-slate-50 px-4 py-3">
          <MiniStat label="Total" value={total} valueClass="text-slate-800" />

          <MiniStat
            label="Present"
            value={present}
            valueClass="text-emerald-600"
          />

          <MiniStat label="Absent" value={absent} valueClass="text-red-600" />

          <MiniStat label="Late" value={late} valueClass="text-amber-600" />
        </div>

        {/* Percentage */}

        <div className="w-full xl:w-40">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Attendance
            </span>

            <span className="text-xs font-black text-slate-800">
              {percentage}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* =======================================================
          STUDENT TABLE
      ======================================================== */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Student
                </th>

                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Email
                </th>

                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Department
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {records.map((item, index) => {
                const student =
                  item.studentId && typeof item.studentId === "object"
                    ? item.studentId
                    : null;

                const studentName =
                  student?.name || item.studentName || "Unknown Student";

                const studentEmail = student?.email || item.email || "—";

                const studentDepartment =
                  student?.department || record.department || "—";

                const initials = getInitials(studentName);

                return (
                  <tr
                    key={item._id || student?._id || `${record._id}-${index}`}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-blue-600">
                          {initials}
                        </div>

                        <span className="text-xs font-bold text-slate-700">
                          {studentName}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-xs text-slate-500">
                      {studentEmail}
                    </td>

                    <td className="px-4 py-3.5 text-xs text-slate-500">
                      {studentDepartment}
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   MINI STAT
============================================================= */

function MiniStat({ label, value, valueClass }) {
  return (
    <div className="text-center">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className={`mt-1 text-sm font-black ${valueClass}`}>{value}</p>
    </div>
  );
}

/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({ status }) {
  let className = "bg-slate-50 text-slate-600 border-slate-200";

  if (status === "Present") {
    className = "bg-emerald-50 text-emerald-700 border-emerald-100";
  }

  if (status === "Absent") {
    className = "bg-red-50 text-red-700 border-red-100";
  }

  if (status === "Late") {
    className = "bg-amber-50 text-amber-700 border-amber-100";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${className}`}
    >
      {status || "Unknown"}
    </span>
  );
}

/* =============================================================
   INITIALS
============================================================= */

function getInitials(name) {
  if (!name || name === "Unknown Student") {
    return "??";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
