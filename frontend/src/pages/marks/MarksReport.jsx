import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function MarksReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [department, setDepartment] = useState("All");
  const [semester, setSemester] = useState("All");
  const [course, setCourse] = useState("All");
  const [resultType, setResultType] = useState("All");

  // Backend data will be connected here later.
  const records = [];

  const filteredRecords = records.filter((record) => {
    const departmentMatch =
      department === "All" || record.department === department;

    const semesterMatch = semester === "All" || record.semester === semester;

    const courseMatch = course === "All" || record.course === course;

    const resultTypeMatch =
      resultType === "All" || record.resultType === resultType;

    return departmentMatch && semesterMatch && courseMatch && resultTypeMatch;
  });

  const totalStudents = filteredRecords.length;

  const totalMarks = filteredRecords.reduce(
    (sum, record) => sum + Number(record.totalMarks || 0),
    0,
  );

  const totalObtained = filteredRecords.reduce(
    (sum, record) => sum + Number(record.obtainedMarks || 0),
    0,
  );

  const averagePercentage =
    totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(1) : "0.0";

  const passedStudents = filteredRecords.filter(
    (record) => Number(record.obtainedMarks) >= Number(record.totalMarks) * 0.4,
  ).length;

  const failedStudents = totalStudents - passedStudents;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* =====================================================
          PAGE LAYOUT
      ====================================================== */}

      <div className="flex">
        {/* SIDEBAR */}

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* CONTENT */}

        <div className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              {/* =================================================
                  HEADER
              ================================================== */}

              <div className="mb-7">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                  Marks & Results
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Result Report
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Analyze student performance across courses, assessments, and
                  semesters.
                </p>
              </div>

              {/* =================================================
                  FILTERS
              ================================================== */}

              <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-sm font-bold text-slate-800">
                    Report Filters
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Select the criteria you want to include in the report.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {/* Department */}

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Department
                    </label>

                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="All">All Departments</option>

                      <option value="CSE">CSE</option>

                      <option value="EEE">EEE</option>

                      <option value="BBA">BBA</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Semester */}

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Semester / Class
                    </label>

                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="All">All Semesters</option>

                      <option value="1">1</option>

                      <option value="2">2</option>

                      <option value="3">3</option>

                      <option value="4">4</option>

                      <option value="5">5</option>

                      <option value="6">6</option>

                      <option value="7">7</option>

                      <option value="8">8</option>

                      <option value="12">12</option>
                    </select>
                  </div>

                  {/* Course */}

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Course
                    </label>

                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="All">All Courses</option>

                      <option value="CSE340">CSE340</option>

                      <option value="CSE331">CSE331</option>

                      <option value="CSE470">CSE470</option>

                      <option value="CSE471">CSE471</option>
                    </select>
                  </div>

                  {/* Result Type */}

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Result Type
                    </label>

                    <select
                      value={resultType}
                      onChange={(e) => setResultType(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="All">All Assessments</option>

                      <option value="Mid Class Test">Mid Class Test</option>

                      <option value="Quiz">Quiz</option>

                      <option value="Assignment">Assignment</option>

                      <option value="Presentation">Presentation</option>

                      <option value="Lab Test">Lab Test</option>

                      <option value="Midterm Exam">Midterm Exam</option>

                      <option value="Final Exam">Final Exam</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* =================================================
                  SUMMARY CARDS
              ================================================== */}

              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Total Students */}

                <SummaryCard
                  label="Students"
                  value={totalStudents}
                  description="Students in report"
                  icon="👥"
                />

                {/* Average */}

                <SummaryCard
                  label="Average"
                  value={`${averagePercentage}%`}
                  description="Overall average"
                  icon="📈"
                />

                {/* Passed */}

                <SummaryCard
                  label="Passed"
                  value={passedStudents}
                  description="Students passed"
                  icon="✓"
                  positive
                />

                {/* Failed */}

                <SummaryCard
                  label="Failed"
                  value={failedStudents}
                  description="Students requiring attention"
                  icon="!"
                  negative
                />
              </div>

              {/* =================================================
                  REPORT TABLE
              ================================================== */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="text-sm font-bold text-slate-800">
                    Performance Report
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Student performance based on the selected filters.
                  </p>
                </div>

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
                          Assessment
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Marks
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
                          <td colSpan="7" className="px-6 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                              📊
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-slate-700">
                              No result data available
                            </h3>

                            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-400">
                              Result information will appear here once teachers
                              add marks for students.
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
                                <p className="text-sm font-bold text-slate-700">
                                  {record.studentName}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  {record.department} · {record.semester}
                                </p>
                              </td>

                              <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                {record.course}
                              </td>

                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                                  {record.resultType}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                {record.obtainedMarks} / {record.totalMarks}
                              </td>

                              <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                {percentage}%
                              </td>

                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                                  {record.grade || "—"}
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

          {/* =====================================================
              FOOTER
          ====================================================== */}

          <Footer />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({ label, value, description, icon, positive, negative }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400">{label}</p>

          <p
            className={`mt-2 text-2xl font-black ${
              negative
                ? "text-red-600"
                : positive
                  ? "text-emerald-600"
                  : "text-slate-900"
            }`}
          >
            {value}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">{description}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
            negative
              ? "bg-red-50 text-red-600"
              : positive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-blue-50 text-blue-600"
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
