import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const API_URL = "https://student-management-system-4ud6.onrender.com/api/attendance";

export default function AttendanceReport() {
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
        setLoading(false);
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
        throw new Error(result.message || "Failed to load attendance report.");
      }

      setAttendance(result.attendance || []);
    } catch (err) {
      console.error("Attendance report error:", err);

      setError(err.message || "Failed to load attendance report.");
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
     STUDENT ATTENDANCE
  ========================================================= */

  const studentAttendance = useMemo(() => {
    const map = new Map();

    attendance.forEach((session) => {
      (session.attendance || []).forEach((item) => {
        const student =
          item.studentId && typeof item.studentId === "object"
            ? item.studentId
            : null;

        const studentId =
          student?._id || item.studentId || item.studentName || "unknown";

        if (!map.has(studentId)) {
          map.set(studentId, {
            id: studentId,
            name: student?.name || item.studentName || "Unknown Student",
            email: student?.email || item.email || "—",
            department: student?.department || session.department || "—",
            semester: student?.semester || session.semester || "—",
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
          });
        }

        const current = map.get(studentId);

        current.total += 1;

        if (item.status === "Present") {
          current.present += 1;
        } else if (item.status === "Absent") {
          current.absent += 1;
        } else if (item.status === "Late") {
          current.late += 1;
        }
      });
    });

    return Array.from(map.values());
  }, [attendance]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalStudents = studentAttendance.length;

  const totalAttendance = studentAttendance.reduce(
    (sum, student) => sum + student.total,
    0,
  );

  const totalPresent = studentAttendance.reduce(
    (sum, student) => sum + student.present,
    0,
  );

  const totalAbsent = studentAttendance.reduce(
    (sum, student) => sum + student.absent,
    0,
  );

  const totalLate = studentAttendance.reduce(
    (sum, student) => sum + student.late,
    0,
  );

  const overallPercentage =
    totalAttendance > 0
      ? ((totalPresent / totalAttendance) * 100).toFixed(1)
      : "0.0";

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* =====================================================
          BELOW NAVBAR
      ====================================================== */}

      <div className="flex min-h-0 flex-1">
        {/* ===================================================
            SIDEBAR
        ==================================================== */}

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* ===================================================
            MAIN CONTENT AREA
        ==================================================== */}

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
                      Attendance Report
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      Analyze student attendance performance across classes and
                      departments.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => fetchAttendance(filters)}
                    disabled={loading}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className={loading ? "animate-spin" : ""}>↻</span>
                    Refresh
                  </button>
                </div>
              </div>

              {/* =================================================
                  SUMMARY CARDS
              ================================================== */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <ReportCard
                  title="Students"
                  value={totalStudents}
                  icon="👥"
                  iconClass="bg-blue-50 text-blue-600"
                />

                <ReportCard
                  title="Attendance Rate"
                  value={`${overallPercentage}%`}
                  icon="%"
                  iconClass="bg-violet-50 text-violet-600"
                />

                <ReportCard
                  title="Present"
                  value={totalPresent}
                  icon="✓"
                  iconClass="bg-emerald-50 text-emerald-600"
                />

                <ReportCard
                  title="Absent"
                  value={totalAbsent}
                  icon="×"
                  iconClass="bg-red-50 text-red-600"
                />

                <ReportCard
                  title="Late"
                  value={totalLate}
                  icon="◷"
                  iconClass="bg-amber-50 text-amber-600"
                />
              </div>

              {/* =================================================
                  FILTER CARD
              ================================================== */}

              <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <h2 className="text-sm font-bold text-slate-800">
                    Report Filters
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Filter the report by date, department, or semester.
                  </p>
                </div>

                <form
                  onSubmit={handleFilter}
                  className="grid grid-cols-1 gap-5 px-5 py-6 sm:px-7 md:grid-cols-2 xl:grid-cols-4"
                >
                  {/* Date */}

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Date
                    </label>

                    <input
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
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Department
                    </label>

                    <select
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
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Semester / Class
                    </label>

                    <select
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
                      className="h-11 flex-1 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "Loading..." : "Generate Report"}
                    </button>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
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
                <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* =================================================
                  PERFORMANCE OVERVIEW
              ================================================== */}

              {!loading && studentAttendance.length > 0 && (
                <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Overall */}

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Overall Performance
                    </p>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-black tracking-tight text-slate-900">
                          {overallPercentage}%
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Overall attendance
                        </p>
                      </div>

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-lg font-black text-blue-600">
                        %
                      </div>
                    </div>

                    <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{
                          width: `${overallPercentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Present */}

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Present
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-black text-emerald-600">
                          {totalPresent}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Attendance marked present
                        </p>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-black text-emerald-600">
                        ✓
                      </div>
                    </div>
                  </div>

                  {/* Absent */}

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Attention Required
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-black text-red-600">
                          {totalAbsent}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Total absent records
                        </p>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-black text-red-600">
                        !
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* =================================================
                  STUDENT REPORT
              ================================================== */}

              <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        Student Attendance Report
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Attendance performance for each student.
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Students
                      </span>

                      <span className="ml-2 text-sm font-black text-slate-700">
                        {totalStudents}
                      </span>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                    <p className="mt-4 text-sm font-semibold text-slate-600">
                      Generating report...
                    </p>
                  </div>
                ) : studentAttendance.length === 0 ? (
                  <div className="px-6 py-20 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
                      📊
                    </div>

                    <h3 className="mt-5 text-base font-bold text-slate-800">
                      No report data
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-400">
                      There is no attendance data available for the selected
                      filters.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-212.5 text-left">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70">
                          <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Student
                          </th>

                          <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Department
                          </th>

                          <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Total
                          </th>

                          <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Present
                          </th>

                          <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Absent
                          </th>

                          <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Late
                          </th>

                          <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Attendance
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {studentAttendance.map((student) => {
                          const percentage =
                            student.total > 0
                              ? (
                                  (student.present / student.total) *
                                  100
                                ).toFixed(1)
                              : "0.0";

                          const initials = student.name
                            .split(" ")
                            .filter(Boolean)
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase();

                          return (
                            <tr
                              key={student.id}
                              className="transition hover:bg-slate-50/70"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-blue-600">
                                    {initials || "??"}
                                  </div>

                                  <div className="min-w-0">
                                    <p className="truncate text-xs font-bold text-slate-700">
                                      {student.name}
                                    </p>

                                    <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                      {student.email}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <div>
                                  <p className="text-xs font-semibold text-slate-600">
                                    {student.department}
                                  </p>

                                  <p className="mt-0.5 text-[10px] text-slate-400">
                                    Semester {student.semester}
                                  </p>
                                </div>
                              </td>

                              <td className="px-5 py-4 text-center">
                                <span className="text-xs font-bold text-slate-700">
                                  {student.total}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-center">
                                <span className="text-xs font-bold text-emerald-600">
                                  {student.present}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-center">
                                <span className="text-xs font-bold text-red-600">
                                  {student.absent}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-center">
                                <span className="text-xs font-bold text-amber-600">
                                  {student.late}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center justify-end gap-3">
                                  <div className="w-20">
                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                      <div
                                        className={`h-full rounded-full ${
                                          Number(percentage) >= 75
                                            ? "bg-emerald-500"
                                            : Number(percentage) >= 50
                                              ? "bg-amber-500"
                                              : "bg-red-500"
                                        }`}
                                        style={{
                                          width: `${percentage}%`,
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <span
                                    className={`w-12 text-right text-xs font-black ${
                                      Number(percentage) >= 75
                                        ? "text-emerald-600"
                                        : Number(percentage) >= 50
                                          ? "text-amber-600"
                                          : "text-red-600"
                                    }`}
                                  >
                                    {percentage}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {/* =================================================
                  SESSION SUMMARY
              ================================================== */}

              {!loading && attendance.length > 0 && (
                <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                  <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                    <h2 className="text-sm font-bold text-slate-800">
                      Attendance Sessions
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Summary of the attendance sessions included in this
                      report.
                    </p>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {attendance.map((session) => {
                      const records = session.attendance || [];

                      const total = records.length;

                      const present = records.filter(
                        (item) => item.status === "Present",
                      ).length;

                      const absent = records.filter(
                        (item) => item.status === "Absent",
                      ).length;

                      const late = records.filter(
                        (item) => item.status === "Late",
                      ).length;

                      const percentage =
                        total > 0
                          ? ((present / total) * 100).toFixed(1)
                          : "0.0";

                      return (
                        <div
                          key={session._id}
                          className="flex flex-col gap-4 px-5 py-5 transition hover:bg-slate-50/50 sm:px-7 lg:flex-row lg:items-center lg:justify-between"
                        >
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold text-slate-800">
                                {session.department || "Department"}
                              </span>

                              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                                Semester {session.semester || "—"}
                              </span>
                            </div>

                            <p className="mt-1 text-xs text-slate-400">
                              {formatDate(session.date)}
                            </p>
                          </div>

                          <div className="grid grid-cols-4 gap-6">
                            <SessionMetric label="Total" value={total} />

                            <SessionMetric
                              label="Present"
                              value={present}
                              className="text-emerald-600"
                            />

                            <SessionMetric
                              label="Absent"
                              value={absent}
                              className="text-red-600"
                            />

                            <SessionMetric
                              label="Late"
                              value={late}
                              className="text-amber-600"
                            />
                          </div>

                          <div className="min-w-35">
                            <div className="mb-1.5 flex justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Rate
                              </span>

                              <span className="text-xs font-black text-slate-700">
                                {percentage}%
                              </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-blue-600"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
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
   REPORT CARD
============================================================= */

function ReportCard({ title, value, icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            {value}
          </p>
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
   SESSION METRIC
============================================================= */

function SessionMetric({ label, value, className = "text-slate-800" }) {
  return (
    <div className="text-center">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className={`mt-1 text-sm font-black ${className}`}>{value}</p>
    </div>
  );
}
