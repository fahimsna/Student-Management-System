import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { getMarks, updateMarks, deleteMarks } from "../../api/markApi";

export default function MarksReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FILTERS
  // =====================================================

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [semester, setSemester] = useState("All");
  const [course, setCourse] = useState("All");
  const [resultType, setResultType] = useState("All");

  // =====================================================
  // EDIT
  // =====================================================

  const [editingRecord, setEditingRecord] = useState(null);

  const [editForm, setEditForm] = useState({
    course: "",
    resultType: "",
    totalMarks: "",
    obtainedMarks: "",
    date: "",
  });

  const [savingEdit, setSavingEdit] = useState(false);

  // =====================================================
  // DELETE
  // =====================================================

  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =====================================================
  // LOAD MARKS
  // =====================================================

  const loadMarks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMarks();

      console.log("Marks report response:", response.data);

      setRecords(response?.data?.marks || []);
    } catch (err) {
      console.error("Get marks error:", err);

      setError(err?.response?.data?.message || "Failed to load marks report.");
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
        records.map((item) => item.student?.department).filter(Boolean),
      ),
    ].sort();
  }, [records]);

  const semesters = useMemo(() => {
    return [
      ...new Set(records.map((item) => item.student?.semester).filter(Boolean)),
    ].sort((a, b) =>
      String(a).localeCompare(String(b), undefined, {
        numeric: true,
      }),
    );
  }, [records]);

  const courses = useMemo(() => {
    return [
      ...new Set(records.map((item) => item.course).filter(Boolean)),
    ].sort();
  }, [records]);

  const resultTypes = useMemo(() => {
    return [
      ...new Set(records.map((item) => item.resultType).filter(Boolean)),
    ].sort();
  }, [records]);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredRecords = useMemo(() => {
    const keyword = search.trim().toLowerCase();

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
        !keyword ||
        studentName.toLowerCase().includes(keyword) ||
        studentEmail.toLowerCase().includes(keyword) ||
        studentDepartment.toLowerCase().includes(keyword) ||
        studentSemester.toLowerCase().includes(keyword) ||
        recordCourse.toLowerCase().includes(keyword) ||
        recordResultType.toLowerCase().includes(keyword);

      return (
        departmentMatch &&
        semesterMatch &&
        courseMatch &&
        resultTypeMatch &&
        searchMatch
      );
    });
  }, [records, search, department, semester, course, resultType]);

  // =====================================================
  // SUMMARY
  // =====================================================

  const uniqueStudents = useMemo(() => {
    const studentIds = new Set();

    filteredRecords.forEach((record) => {
      if (record.student?._id) {
        studentIds.add(record.student._id);
      }
    });

    return studentIds.size;
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

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setDepartment("All");
    setSemester("All");
    setCourse("All");
    setResultType("All");
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // PRINT
  // =====================================================

  const handlePrint = () => {
    window.print();
  };

  // =====================================================
  // EDIT
  // =====================================================

  const openEditModal = (record) => {
    setEditingRecord(record);

    setEditForm({
      course: record.course || "",
      resultType: record.resultType || "",
      totalMarks: record.totalMarks ?? "",
      obtainedMarks: record.obtainedMarks ?? "",
      date: record.date ? String(record.date).slice(0, 10) : "",
    });
  };

  const closeEditModal = () => {
    if (savingEdit) return;

    setEditingRecord(null);

    setEditForm({
      course: "",
      resultType: "",
      totalMarks: "",
      obtainedMarks: "",
      date: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // EDIT CALCULATIONS
  // =====================================================

  const editTotal = Number(editForm.totalMarks || 0);

  const editObtained = Number(editForm.obtainedMarks || 0);

  const editPercentage = editTotal > 0 ? (editObtained / editTotal) * 100 : 0;

  const calculateGrade = (percentage) => {
    if (percentage >= 80) return "A+";
    if (percentage >= 75) return "A";
    if (percentage >= 70) return "A-";
    if (percentage >= 65) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 55) return "B-";
    if (percentage >= 50) return "C+";
    if (percentage >= 45) return "C";
    if (percentage >= 40) return "D";

    return "F";
  };

  const editGrade = calculateGrade(editPercentage);

  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingRecord?._id) {
      return;
    }

    if (!editForm.course.trim()) {
      alert("Course is required.");
      return;
    }

    if (!editForm.resultType.trim()) {
      alert("Result type is required.");
      return;
    }

    if (!editForm.date) {
      alert("Date is required.");
      return;
    }

    if (editTotal <= 0) {
      alert("Total marks must be greater than 0.");
      return;
    }

    if (editObtained < 0) {
      alert("Obtained marks cannot be negative.");
      return;
    }

    if (editObtained > editTotal) {
      alert("Obtained marks cannot be greater than total marks.");
      return;
    }

    try {
      setSavingEdit(true);

      const payload = {
        studentId: editingRecord.student?._id || editingRecord.student,

        course: editForm.course.trim(),

        resultType: editForm.resultType.trim(),

        totalMarks: editTotal,

        obtainedMarks: editObtained,

        date: editForm.date,
      };

      console.log("Updating marks:", payload);

      const response = await updateMarks(editingRecord._id, payload);

      console.log("Update response:", response.data);

      const updatedMarks = response?.data?.marks;

      if (!updatedMarks) {
        throw new Error("Updated marks were not returned by server.");
      }

      setRecords((prev) =>
        prev.map((record) =>
          record._id === editingRecord._id
            ? {
                ...record,
                ...updatedMarks,
                student: updatedMarks.student || record.student,
              }
            : record,
        ),
      );

      closeEditModal();

      alert("Marks updated successfully.");
    } catch (err) {
      console.error("Update marks error:", err);

      alert(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update marks.",
      );
    } finally {
      setSavingEdit(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const openDeleteConfirm = (id) => {
    setDeletingId(id);
  };

  const closeDeleteConfirm = () => {
    if (deleting) return;

    setDeletingId(null);
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      setDeleting(true);

      console.log("Deleting marks:", deletingId);

      const response = await deleteMarks(deletingId);

      console.log("Delete response:", response.data);

      // Remove from frontend AFTER
      // successful database deletion.
      setRecords((prev) => prev.filter((record) => record._id !== deletingId));

      setDeletingId(null);

      alert("Marks deleted successfully.");
    } catch (err) {
      console.error("Delete marks error:", err);

      alert(err?.response?.data?.message || "Failed to delete marks.");
    } finally {
      setDeleting(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <div className="fixed left-0 right-0 top-0 z-100 h-16 print:hidden">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* =================================================
          DESKTOP SIDEBAR
      ================================================= */}

      <aside className="fixed bottom-0 left-0 top-16 z-90 hidden w-64 overflow-y-auto overflow-x-hidden bg-white lg:block print:hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-80 bg-slate-900/40 lg:hidden print:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =================================================
          MOBILE SIDEBAR
      ================================================= */}

      <div
        className={`
          fixed
          bottom-0
          left-0
          top-16
          z-90
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

      {/* =================================================
          MAIN PAGE
      ================================================= */}

      <div className="min-h-screen bg-slate-50 pt-16 print:bg-white print:pt-0">
        <div className="min-h-[calc(100vh-4rem)] lg:ml-64">
          <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 print:p-0">
            <div className="mx-auto w-full max-w-7xl">
              {/* HEADER */}

              <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between print:mb-5">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                    Marks & Results
                  </p>

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Result Report
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    View and manage student assessment results.
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
                    className="h-11 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    🖨 Print
                  </button>
                </div>
              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-bold text-red-700">Error</p>

                  <p className="mt-1 text-xs text-red-500">{error}</p>
                </div>
              )}

              {/* =================================================
                  FILTERS
              ================================================= */}

              <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print:hidden">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Report Filters
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Filter result records.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
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
                    placeholder="Search student, email, course..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <FilterSelect
                    label="Department"
                    value={department}
                    onChange={setDepartment}
                    defaultLabel="All Departments"
                    options={departments}
                  />

                  <FilterSelect
                    label="Class / Semester"
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
                    label="Assessment"
                    value={resultType}
                    onChange={setResultType}
                    defaultLabel="All Assessments"
                    options={resultTypes}
                  />
                </div>
              </section>

              {/* =================================================
                  SUMMARY
              ================================================= */}

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

              {/* =================================================
                  TABLE
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Detailed Result Report
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Individual assessment results.
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    {filteredRecords.length} results
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-300">
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

                        <TableHead>Actions</TableHead>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="11" className="px-6 py-16 text-center">
                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                            <p className="mt-4 text-sm text-slate-500">
                              Loading results...
                            </p>
                          </td>
                        </tr>
                      ) : filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan="11" className="px-6 py-16 text-center">
                            <p className="text-sm font-semibold text-slate-500">
                              No result records found.
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Try changing your filters.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((record, index) => {
                          const percentage = Number(record.percentage || 0);

                          const isFailed = percentage < 40;

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
                                  {record.student?.name || "Unknown Student"}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  {record.student?.email || "—"}
                                </p>
                              </td>

                              <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                                {record.student?.department || "—"}
                              </td>

                              <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                {record.student?.semester || "—"}
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

                                <span className="text-xs text-slate-400">
                                  {" "}
                                  / {record.totalMarks}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                {percentage.toFixed(1)}%
                              </td>

                              <td className="px-6 py-4">
                                <span
                                  className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                                    isFailed
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

                              {/* ACTIONS */}

                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => openEditModal(record)}
                                    className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
                                  >
                                    ✏️ Edit
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openDeleteConfirm(record._id)
                                    }
                                    className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                                  >
                                    🗑 Delete
                                  </button>
                                </div>
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

          <div className="print:hidden">
            <Footer />
          </div>
        </div>
      </div>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editingRecord && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
                  Edit Result
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Update Marks
                </h2>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={savingEdit}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {/* STUDENT */}

            <div className="mx-6 mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Student
              </p>

              <p className="mt-1 text-sm font-bold text-slate-800">
                {editingRecord.student?.name || "Unknown Student"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {editingRecord.student?.department || "—"} •{" "}
                {editingRecord.student?.semester || "—"}
              </p>
            </div>

            {/* FORM */}

            <form onSubmit={handleUpdate} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormInput
                  label="Course"
                  name="course"
                  value={editForm.course}
                  onChange={handleEditChange}
                  placeholder="e.g. Bangla"
                  required
                />

                <FormInput
                  label="Result Type"
                  name="resultType"
                  value={editForm.resultType}
                  onChange={handleEditChange}
                  placeholder="e.g. Quiz 1"
                  required
                />

                <FormInput
                  label="Total Marks"
                  name="totalMarks"
                  type="number"
                  value={editForm.totalMarks}
                  onChange={handleEditChange}
                  min="1"
                  required
                />

                <FormInput
                  label="Obtained Marks"
                  name="obtainedMarks"
                  type="number"
                  value={editForm.obtainedMarks}
                  onChange={handleEditChange}
                  min="0"
                  max={editForm.totalMarks || undefined}
                  required
                />

                <FormInput
                  label="Date"
                  name="date"
                  type="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                  required
                />
              </div>

              {/* PREVIEW */}

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">
                  Result Preview
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400">
                      PERCENTAGE
                    </p>

                    <p className="mt-1 text-xl font-black text-slate-800">
                      {editPercentage.toFixed(2)}%
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400">
                      GRADE
                    </p>

                    <p className="mt-1 text-xl font-black text-blue-600">
                      {editGrade}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400">
                      STATUS
                    </p>

                    <p
                      className={`mt-1 text-xl font-black ${
                        editPercentage >= 40
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {editPercentage >= 40 ? "PASS" : "FAIL"}
                    </p>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={savingEdit}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingEdit}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}

      {deletingId && (
        <div className="fixed inset-0 z-210 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl">
              🗑️
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Delete Result?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This result will be permanently deleted from the database. This
              action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteConfirm}
                disabled={deleting}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
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

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// =======================================================
// FORM INPUT
// =======================================================

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  max,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
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

          <p className="mt-1 text-[11px] text-slate-400">{description}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
