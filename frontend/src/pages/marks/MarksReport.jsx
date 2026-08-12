import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { getMarks } from "../../api/markApi";

export default function MarksReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [department, setDepartment] = useState("All");
  const [semester, setSemester] = useState("All");
  const [course, setCourse] = useState("All");
  const [resultType, setResultType] = useState("All");
  const [search, setSearch] = useState("");

  // =====================================================
  // LOAD MARKS
  // =====================================================

  const loadMarks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMarks();

      console.log("Result report marks:", response.data);

      setRecords(response?.data?.marks || []);
    } catch (err) {
      console.error("Failed to load result report:", err);

      setError(err?.response?.data?.message || "Failed to load result report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarks();
  }, []);

  // =====================================================
  // FILTER OPTIONS
  // =====================================================

  const departments = useMemo(() => {
    return [
      ...new Set(
        records.map((record) => record.student?.department).filter(Boolean),
      ),
    ].sort();
  }, [records]);

  const semesters = useMemo(() => {
    return [
      ...new Set(
        records.map((record) => record.student?.semester).filter(Boolean),
      ),
    ].sort((a, b) =>
      String(a).localeCompare(String(b), undefined, {
        numeric: true,
      }),
    );
  }, [records]);

  const courses = useMemo(() => {
    return [
      ...new Set(records.map((record) => record.course).filter(Boolean)),
    ].sort();
  }, [records]);

  const resultTypes = useMemo(() => {
    return [
      ...new Set(records.map((record) => record.resultType).filter(Boolean)),
    ].sort();
  }, [records]);

  // =====================================================
  // FILTER RECORDS
  // =====================================================

  const filteredRecords = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return records.filter((record) => {
      const studentName = record.student?.name || "";

      const studentEmail = record.student?.email || "";

      const studentDepartment = record.student?.department || "";

      const studentSemester = record.student?.semester || "";

      const recordCourse = record.course || "";

      const recordResultType = record.resultType || "";

      const departmentMatch =
        department === "All" || studentDepartment === department;

      const semesterMatch = semester === "All" || studentSemester === semester;

      const courseMatch = course === "All" || recordCourse === course;

      const resultTypeMatch =
        resultType === "All" || recordResultType === resultType;

      const searchMatch =
        !searchValue ||
        studentName.toLowerCase().includes(searchValue) ||
        studentEmail.toLowerCase().includes(searchValue) ||
        studentDepartment.toLowerCase().includes(searchValue) ||
        studentSemester.toLowerCase().includes(searchValue) ||
        recordCourse.toLowerCase().includes(searchValue) ||
        recordResultType.toLowerCase().includes(searchValue);

      return (
        departmentMatch &&
        semesterMatch &&
        courseMatch &&
        resultTypeMatch &&
        searchMatch
      );
    });
  }, [records, department, semester, course, resultType, search]);

  // =====================================================
  // SUMMARY
  // =====================================================

  const uniqueStudents = useMemo(() => {
    const ids = new Set();

    filteredRecords.forEach((record) => {
      if (record.student?._id) {
        ids.add(record.student._id);
      }
    });

    return ids.size;
  }, [filteredRecords]);

  const totalMarks = useMemo(() => {
    return filteredRecords.reduce(
      (sum, record) => sum + Number(record.totalMarks || 0),
      0,
    );
  }, [filteredRecords]);

  const totalObtained = useMemo(() => {
    return filteredRecords.reduce(
      (sum, record) => sum + Number(record.obtainedMarks || 0),
      0,
    );
  }, [filteredRecords]);

  const averagePercentage =
    totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(1) : "0.0";

  const passedCount = filteredRecords.filter(
    (record) => Number(record.percentage || 0) >= 40,
  ).length;

  const failedCount = filteredRecords.length - passedCount;

  const passRate =
    filteredRecords.length > 0
      ? ((passedCount / filteredRecords.length) * 100).toFixed(1)
      : "0.0";

  const highestPercentage =
    filteredRecords.length > 0
      ? Math.max(
          ...filteredRecords.map((record) => Number(record.percentage || 0)),
        ).toFixed(1)
      : "0.0";

  const lowestPercentage =
    filteredRecords.length > 0
      ? Math.min(
          ...filteredRecords.map((record) => Number(record.percentage || 0)),
        ).toFixed(1)
      : "0.0";

  // =====================================================
  // GRADE COUNTS
  // =====================================================

  const gradeCounts = useMemo(() => {
    const counts = {};

    filteredRecords.forEach((record) => {
      const grade = record.grade || "N/A";

      counts[grade] = (counts[grade] || 0) + 1;
    });

    return counts;
  }, [filteredRecords]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setDepartment("All");
    setSemester("All");
    setCourse("All");
    setResultType("All");
    setSearch("");
  };

  // =====================================================
  // PRINT
  // =====================================================

  const handlePrint = () => {
    window.print();
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <>
      {/* ===================================================
          FIXED NAVBAR
      ==================================================== */}

      <div
        className="
          fixed
          left-0
          right-0
          top-0
          z-[100]
          h-16
          print:hidden
        "
      >
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* ===================================================
          FIXED SIDEBAR
      ==================================================== */}

      <aside
        className="
          fixed
          bottom-0
          left-0
          top-16
          z-[90]
          hidden
          w-64
          overflow-y-auto
          overflow-x-hidden
          bg-white
          print:hidden
          lg:block
        "
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* ===================================================
          MOBILE SIDEBAR OVERLAY
      ==================================================== */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-[80]
            bg-slate-900/40
            lg:hidden
            print:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===================================================
          MOBILE SIDEBAR
      ==================================================== */}

      <div
        className={`
          fixed
          bottom-0
          left-0
          top-16
          z-[90]
          w-72
          overflow-y-auto
          overflow-x-hidden
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          lg:hidden
          print:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* ===================================================
          PAGE AREA

          Navbar = 64px
          Sidebar = 256px
      ==================================================== */}

      <div
        className="
          min-h-screen
          bg-slate-50
          pt-16
          print:bg-white
          print:pt-0
        "
      >
        <div
          className="
            min-h-[calc(100vh-4rem)]
            lg:ml-64
          "
        >
          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 print:p-0">
            <div className="mx-auto w-full max-w-7xl">
              {/* =============================================
                  HEADER
              ============================================== */}

              <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between print:mb-5">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 print:text-black">
                    Marks & Results
                  </p>

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Result Report
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Analyze student performance across courses, assessments,
                    classes, and departments.
                  </p>
                </div>

                <div className="flex gap-3 print:hidden">
                  <button
                    type="button"
                    onClick={loadMarks}
                    disabled={loading}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "↻ Refresh"}
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    disabled={filteredRecords.length === 0}
                    className="h-11 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    🖨 Print Report
                  </button>
                </div>
              </div>

              {/* =============================================
                  PRINT HEADER
              ============================================== */}

              <div className="mb-6 hidden print:block">
                <div className="border-b-2 border-slate-900 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Student Result Report
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Generated on {new Date().toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>

              {/* =============================================
                  ERROR
              ============================================== */}

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 print:hidden">
                  <span>⚠️</span>

                  <div>
                    <p className="text-sm font-bold text-red-700">
                      Unable to load report
                    </p>

                    <p className="mt-1 text-xs text-red-500">{error}</p>
                  </div>
                </div>
              )}

              {/* =============================================
                  FILTERS
              ============================================== */}

              <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print:hidden">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Report Filters
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Filter results by student, department, class, course, or
                      assessment.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>

                {/* SEARCH */}

                <div className="mb-4">
                  <label className="mb-2 block text-xs font-bold text-slate-600">
                    Search
                  </label>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search student, email, course or result type..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* FILTERS */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <FilterSelect
                    label="Department"
                    value={department}
                    onChange={setDepartment}
                    defaultLabel="All Departments"
                    options={departments}
                  />

                  <FilterSelect
                    label="Semester / Class"
                    value={semester}
                    onChange={setSemester}
                    defaultLabel="All Classes"
                    options={semesters}
                  />

                  <FilterSelect
                    label="Course"
                    value={course}
                    onChange={setCourse}
                    defaultLabel="All Courses"
                    options={courses}
                  />

                  <FilterSelect
                    label="Result Type"
                    value={resultType}
                    onChange={setResultType}
                    defaultLabel="All Assessments"
                    options={resultTypes}
                  />
                </div>
              </section>

              {/* =============================================
                  FILTER BADGES
              ============================================== */}

              <div className="mb-6 flex flex-wrap items-center gap-2 print:hidden">
                {department !== "All" && (
                  <FilterBadge label="Department" value={department} />
                )}

                {semester !== "All" && (
                  <FilterBadge label="Class" value={semester} />
                )}

                {course !== "All" && (
                  <FilterBadge label="Course" value={course} />
                )}

                {resultType !== "All" && (
                  <FilterBadge label="Assessment" value={resultType} />
                )}

                {search && <FilterBadge label="Search" value={search} />}

                {department === "All" &&
                  semester === "All" &&
                  course === "All" &&
                  resultType === "All" &&
                  !search && (
                    <span className="text-xs text-slate-400">
                      Showing all result records
                    </span>
                  )}
              </div>

              {/* =============================================
                  SUMMARY CARDS
              ============================================== */}

              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                  label="Students"
                  value={uniqueStudents}
                  description="Unique students"
                  icon="👥"
                />

                <SummaryCard
                  label="Average"
                  value={`${averagePercentage}%`}
                  description="Overall average"
                  icon="📈"
                />

                <SummaryCard
                  label="Passed"
                  value={passedCount}
                  description={`${passRate}% pass rate`}
                  icon="✓"
                  positive
                />

                <SummaryCard
                  label="Failed"
                  value={failedCount}
                  description="Below 40%"
                  icon="!"
                  danger
                />
              </div>

              {/* =============================================
                  PERFORMANCE
              ============================================== */}

              <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Performance Overview
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Summary of the selected result records.
                    </p>
                  </div>

                  <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                    {filteredRecords.length} Records
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <OverviewItem
                    label="Highest"
                    value={`${highestPercentage}%`}
                  />

                  <OverviewItem label="Lowest" value={`${lowestPercentage}%`} />

                  <OverviewItem label="Total Obtained" value={totalObtained} />

                  <OverviewItem label="Total Marks" value={totalMarks} />
                </div>
              </section>

              {/* =============================================
                  GRADE DISTRIBUTION
              ============================================== */}

              <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-sm font-bold text-slate-800">
                    Grade Distribution
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Number of result records by grade.
                  </p>
                </div>

                {filteredRecords.length === 0 ? (
                  <div className="rounded-xl bg-slate-50 py-8 text-center text-sm text-slate-400">
                    No grade data available.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10">
                    {[
                      "A+",
                      "A",
                      "A-",
                      "B+",
                      "B",
                      "B-",
                      "C+",
                      "C",
                      "D",
                      "F",
                    ].map((grade) => (
                      <div
                        key={grade}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center"
                      >
                        <p className="text-lg font-black text-slate-800">
                          {grade}
                        </p>

                        <p className="mt-1 text-xl font-bold text-blue-600">
                          {gradeCounts[grade] || 0}
                        </p>

                        <p className="text-[10px] font-medium text-slate-400">
                          Records
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* =============================================
                  DETAILED TABLE
              ============================================== */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Detailed Result Report
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Individual student assessment results.
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-slate-400">
                    {filteredRecords.length} result
                    {filteredRecords.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px]">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70">
                        <TableHead>#</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Assessment</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Date</TableHead>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="10" className="px-6 py-16 text-center">
                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                            <p className="mt-4 text-sm font-medium text-slate-500">
                              Loading result report...
                            </p>
                          </td>
                        </tr>
                      ) : filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="px-6 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
                              📊
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-slate-700">
                              No result records
                            </h3>

                            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                              No marks match the selected filters.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((record, index) => {
                          const student = record.student;

                          const percentage = Number(record.percentage || 0);

                          return (
                            <tr
                              key={record._id}
                              className="border-b border-slate-100 transition hover:bg-slate-50/70"
                            >
                              <td className="px-6 py-4 text-xs font-bold text-slate-400">
                                {index + 1}
                              </td>

                              <td className="px-6 py-4">
                                <p className="text-sm font-bold text-slate-700">
                                  {student?.name || "Unknown Student"}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  {student?.email || "—"}
                                </p>
                              </td>

                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                                  {student?.department || "—"}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                {student?.semester || "—"}
                              </td>

                              <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                {record.course || "—"}
                              </td>

                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                                  {record.resultType || "—"}
                                </span>
                              </td>

                              <td className="px-6 py-4">
                                <span className="text-sm font-bold text-slate-800">
                                  {record.obtainedMarks}
                                </span>

                                <span className="text-xs font-medium text-slate-400">
                                  {" "}
                                  / {record.totalMarks}
                                </span>
                              </td>

                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-slate-700">
                                    {percentage.toFixed(1)}%
                                  </span>

                                  <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 lg:block">
                                    <div
                                      className="h-full rounded-full bg-blue-600"
                                      style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <span
                                  className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                                    record.grade === "F"
                                      ? "bg-red-50 text-red-600"
                                      : "bg-emerald-50 text-emerald-600"
                                  }`}
                                >
                                  {record.grade || "—"}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-xs font-medium text-slate-500">
                                {formatDate(record.date)}
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

          {/* ===============================================
              FOOTER
          ================================================ */}

          <div className="print:hidden">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

// =======================================================
// FILTER SELECT
// =======================================================

function FilterSelect({ label, value, onChange, defaultLabel, options }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="All">{defaultLabel}</option>

        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

// =======================================================
// TABLE HEAD
// =======================================================

function TableHead({ children }) {
  return (
    <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
      {children}
    </th>
  );
}

// =======================================================
// SUMMARY CARD
// =======================================================

function SummaryCard({
  label,
  value,
  description,
  icon,
  positive = false,
  danger = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400">{label}</p>

          <p
            className={`mt-2 text-2xl font-black ${
              danger
                ? "text-red-600"
                : positive
                  ? "text-emerald-600"
                  : "text-slate-900"
            }`}
          >
            {value}
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm ${
            danger
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

// =======================================================
// OVERVIEW ITEM
// =======================================================

function OverviewItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-slate-800">{value}</p>
    </div>
  );
}

// =======================================================
// FILTER BADGE
// =======================================================

function FilterBadge({ label, value }) {
  return (
    <span className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
      {label}: {value}
    </span>
  );
}
