import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  Search,
  Trash2,
  Edit3,
  UserPlus,
  Users,
  Eye,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";
import { deleteStudent, getStudent } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getStudent();

      setStudents(result.data.students || []);
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id),
      );
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to delete student.");
    }
  };

  const filteredStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !search ||
        student.name?.toLowerCase().includes(search) ||
        student.email?.toLowerCase().includes(search) ||
        student.department?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, searchTerm, statusFilter]);

  const activeCount = students.filter(
    (student) => student.status === "Active",
  ).length;

  const inactiveCount = students.filter(
    (student) => student.status === "Inactive",
  ).length;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "S";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  const hasFilters = searchTerm.trim() !== "" || statusFilter !== "All";

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main layout */}
      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Right side */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">
              {/* =====================================================
                  PAGE HEADER
              ====================================================== */}
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Student management
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                    Students
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    View, manage and organize all student records from one
                    place.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/add-student")}
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10"
                >
                  <UserPlus
                    size={17}
                    className="transition-transform group-hover:scale-105"
                  />
                  Add Student
                </button>
              </div>

              {/* =====================================================
                  QUICK STATS
              ====================================================== */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Users size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Total students
                      </p>

                      <p className="mt-0.5 text-xl font-bold tracking-tight text-slate-800">
                        {loading ? "—" : students.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Active
                      </p>

                      <p className="mt-0.5 text-xl font-bold tracking-tight text-slate-800">
                        {loading ? "—" : activeCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Inactive
                      </p>

                      <p className="mt-0.5 text-xl font-bold tracking-tight text-slate-800">
                        {loading ? "—" : inactiveCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =====================================================
                  ERROR
              ====================================================== */}
              {error && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />

                  <p>{error}</p>
                </div>
              )}

              {/* =====================================================
                  SEARCH / FILTER
              ====================================================== */}
              <div className="mt-7 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_24px_rgba(15,23,42,0.035)] sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  {/* Search */}
                  <div className="relative min-w-0 flex-1">
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search students by name, email or department..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-11 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  {/* Filter */}
                  <div className="relative w-full lg:w-48">
                    <SlidersHorizontal
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                {/* Results row */}
                <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Users size={15} />

                    <span>
                      Showing{" "}
                      <span className="font-bold text-slate-700">
                        {filteredStudents.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-slate-700">
                        {students.length}
                      </span>{" "}
                      students
                    </span>
                  </div>

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="w-fit text-xs font-bold text-blue-600 transition hover:text-blue-700"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>

              {/* =====================================================
                  TABLE
              ====================================================== */}
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                {loading ? (
                  <div className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                    </div>

                    <p className="mt-4 text-sm font-medium text-slate-500">
                      Loading students...
                    </p>
                  </div>
                ) : filteredStudents.length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                      <Users size={25} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-800">
                      No students found
                    </h3>

                    <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-400">
                      No student records match your current search or filter.
                    </p>

                    {hasFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px]">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70">
                          <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Student
                          </th>

                          <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Department
                          </th>

                          <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Semester
                          </th>

                          <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Status
                          </th>

                          <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Joined
                          </th>

                          <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((student) => (
                          <tr
                            key={student._id}
                            className="group transition hover:bg-slate-50/70"
                          >
                            {/* Student */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3.5">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">
                                  {getInitials(student.name)}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-bold text-slate-800">
                                    {student.name || "Unnamed student"}
                                  </p>

                                  <p className="mt-0.5 truncate text-xs text-slate-400">
                                    {student.email || "No email"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Department */}
                            <td className="px-5 py-4">
                              <span className="text-sm font-medium text-slate-600">
                                {student.department || "—"}
                              </span>
                            </td>

                            {/* Semester */}
                            <td className="px-5 py-4">
                              <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                                Semester {student.semester || "—"}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                  student.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    student.status === "Active"
                                      ? "bg-emerald-500"
                                      : "bg-slate-400"
                                  }`}
                                />

                                {student.status || "Unknown"}
                              </span>
                            </td>

                            {/* Joined */}
                            <td className="px-5 py-4">
                              <span className="text-sm text-slate-500">
                                {formatDate(student.createdAt)}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* View */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(`/students/${student._id}`)
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                  title="View Student"
                                >
                                  <Eye size={16} />
                                </button>

                                {/* Edit */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(`/students/edit/${student._id}`)
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                  title="Edit Student"
                                >
                                  <Edit3 size={16} />
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() => handleDelete(student._id)}
                                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                  title="Delete Student"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
