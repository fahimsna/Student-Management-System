import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { getMarks } from "../../api/markApi";

export default function MarksRecords() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // LOAD MARKS
  // =====================================================

  const loadMarks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMarks();

      console.log("Marks records response:", response.data);

      setRecords(response?.data?.marks || []);
    } catch (err) {
      console.error("Failed to load marks:", err);

      console.error("Backend response:", err?.response?.data);

      setError(err?.response?.data?.message || "Failed to load marks records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarks();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredRecords = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return records;
    }

    return records.filter((record) => {
      const studentName = record.student?.name || "";

      const department = record.student?.department || "";

      const semester = record.student?.semester || "";

      const course = record.course || "";

      const resultType = record.resultType || "";

      return (
        studentName.toLowerCase().includes(value) ||
        department.toLowerCase().includes(value) ||
        semester.toLowerCase().includes(value) ||
        course.toLowerCase().includes(value) ||
        resultType.toLowerCase().includes(value)
      );
    });
  }, [records, search]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              {/* HEADER */}

              <div className="mb-7">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                  Marks & Results
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Marks Records
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  View marks recorded for students.
                </p>
              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <span>⚠️</span>

                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              )}

              {/* MAIN CARD */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* CARD HEADER */}

                <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Student Marks
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      {records.length} record
                      {records.length !== 1 ? "s" : ""} found.
                    </p>
                  </div>

                  <div className="flex w-full gap-3 md:w-auto">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search student, course..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 md:w-72"
                    />

                    <button
                      type="button"
                      onClick={loadMarks}
                      disabled={loading}
                      className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                      {loading ? "..." : "Refresh"}
                    </button>
                  </div>
                </div>

                {/* TABLE */}

                <div className="overflow-x-auto">
                  <table className="w-full min-w-237.5">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70">
                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Student
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Course
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Result Type
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Total
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Obtained
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Percentage
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Grade
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-16 text-center">
                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                            <p className="mt-4 text-sm font-medium text-slate-500">
                              Loading marks...
                            </p>
                          </td>
                        </tr>
                      ) : filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                              📋
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-slate-700">
                              No marks records found
                            </h3>

                            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                              {search
                                ? "No records match your search."
                                : "Marks records will appear here after a teacher adds marks for a student."}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((record) => {
                          const student = record.student;

                          const percentage =
                            record.totalMarks > 0
                              ? (
                                  (record.obtainedMarks / record.totalMarks) *
                                  100
                                ).toFixed(1)
                              : "0.0";

                          return (
                            <tr
                              key={record._id}
                              className="border-b border-slate-100 transition hover:bg-slate-50/70"
                            >
                              {/* STUDENT */}

                              <td className="px-6 py-4">
                                <div>
                                  <p className="text-sm font-bold text-slate-700">
                                    {student?.name || "Unknown Student"}
                                  </p>

                                  <p className="mt-0.5 text-xs text-slate-400">
                                    {student?.department || "—"} · Class{" "}
                                    {student?.semester || "—"}
                                  </p>
                                </div>
                              </td>

                              {/* COURSE */}

                              <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                {record.course}
                              </td>

                              {/* RESULT TYPE */}

                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                                  {record.resultType}
                                </span>
                              </td>

                              {/* TOTAL */}

                              <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                {record.totalMarks}
                              </td>

                              {/* OBTAINED */}

                              <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                {record.obtainedMarks}
                              </td>

                              {/* PERCENTAGE */}

                              <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                {percentage}%
                              </td>

                              {/* GRADE */}

                              <td className="px-6 py-4">
                                <span
                                  className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                                    record.grade === "F"
                                      ? "bg-red-50 text-red-600"
                                      : "bg-emerald-50 text-emerald-600"
                                  }`}
                                >
                                  {record.grade}
                                </span>
                              </td>

                              {/* DATE */}

                              <td className="px-6 py-4 text-sm text-slate-500">
                                {record.date
                                  ? new Date(record.date).toLocaleDateString(
                                      "en-GB",
                                    )
                                  : "—"}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
