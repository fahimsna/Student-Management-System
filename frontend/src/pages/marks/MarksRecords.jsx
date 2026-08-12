import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function MarksRecords() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const records = [];

  const filteredRecords = records.filter((record) => {
    const value = search.toLowerCase();

    return (
      record.studentName?.toLowerCase().includes(value) ||
      record.course?.toLowerCase().includes(value) ||
      record.resultType?.toLowerCase().includes(value) ||
      record.department?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}

      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        {/* Sidebar */}

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}

        <div className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              {/* Header */}

              <div className="mb-7">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                  Marks & Results
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Marks Records
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  View and manage marks recorded for students.
                </p>
              </div>

              {/* Main Card */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Card Header */}

                <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Student Marks
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      All assessment and examination records.
                    </p>
                  </div>

                  {/* Search */}

                  <div className="w-full md:w-72">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search student, course..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Table */}

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
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
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                              📋
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-slate-700">
                              No marks records found
                            </h3>

                            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                              Marks records will appear here after a teacher
                              adds marks for a student.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((record) => {
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
                              <td className="px-6 py-4">
                                <div>
                                  <p className="text-sm font-bold text-slate-700">
                                    {record.studentName}
                                  </p>

                                  <p className="mt-0.5 text-xs text-slate-400">
                                    {record.department} · {record.semester}
                                  </p>
                                </div>
                              </td>

                              <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                {record.course}
                              </td>

                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                                  {record.resultType}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                {record.totalMarks}
                              </td>

                              <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                {record.obtainedMarks}
                              </td>

                              <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                {percentage}%
                              </td>

                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                                  {record.grade}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm text-slate-500">
                                {record.date}
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
