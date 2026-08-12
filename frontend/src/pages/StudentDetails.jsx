import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  Mail,
  Building2,
  GraduationCap,
  CalendarDays,
  User,
  Pencil,
} from "lucide-react";
import { getSingleStudent } from "../api/studentApi";

export default function StudentDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getSingleStudent(id);

        setStudent(result.data.student);
      } catch (error) {
        console.log(error);

        setError(error.response?.data?.message || "Failed to load student.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout */}
      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Right Side */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Main Content */}
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-4xl">
              {/* Page Header */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Student management
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                  Student Details
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  View complete information about this student.
                </p>
              </div>

              {/* Loading */}
              {loading && (
                <div className="mt-7 rounded-2xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Loading student information...
                  </p>
                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50 p-5">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {/* Student Details */}
              {!loading && !error && student && (
                <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                  {/* Profile Header */}
                  <div className="relative overflow-hidden bg-slate-900 px-5 py-7 sm:px-8 sm:py-8">
                    {/* Decorative Background */}
                    <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-600/10" />

                    <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-blue-600/5" />

                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                      {/* Avatar */}
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg">
                        <span className="text-2xl font-bold text-slate-900">
                          {student.name
                            ? student.name.charAt(0).toUpperCase()
                            : "S"}
                        </span>
                      </div>

                      {/* Student Name */}
                      <div className="min-w-0">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Student profile
                        </p>

                        <h2 className="truncate text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                          {student.name}
                        </h2>

                        <p className="mt-1 truncate text-sm text-slate-400">
                          {student.email}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="sm:ml-auto">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                            student.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/20"
                              : "bg-red-500/10 text-red-300 ring-1 ring-inset ring-red-400/20"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              student.status === "Active"
                                ? "bg-emerald-400"
                                : "bg-red-400"
                            }`}
                          />

                          {student.status || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="p-5 sm:p-8">
                    {/* Section Header */}
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">
                          Student information
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Personal and academic information.
                        </p>
                      </div>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/students/edit/${student._id}`)
                        }
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10"
                      >
                        <Pencil size={15} />

                        <span className="hidden sm:inline">Edit Student</span>
                      </button>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Email */}
                      <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-200 hover:bg-blue-50/30">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-100 transition group-hover:text-blue-600">
                            <Mail size={18} />
                          </div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Email
                          </p>
                        </div>

                        <p className="mt-4 break-all text-sm font-semibold text-slate-800">
                          {student.email || "N/A"}
                        </p>
                      </div>

                      {/* Department */}
                      <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-200 hover:bg-blue-50/30">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-100 transition group-hover:text-blue-600">
                            <Building2 size={18} />
                          </div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Department
                          </p>
                        </div>

                        <p className="mt-4 text-sm font-semibold text-slate-800">
                          {student.department || "N/A"}
                        </p>
                      </div>

                      {/* Semester */}
                      <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-200 hover:bg-blue-50/30">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-100 transition group-hover:text-blue-600">
                            <GraduationCap size={18} />
                          </div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Semester
                          </p>
                        </div>

                        <p className="mt-4 text-sm font-semibold text-slate-800">
                          {student.semester
                            ? `Semester ${student.semester}`
                            : "N/A"}
                        </p>
                      </div>

                      {/* Joined */}
                      <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-200 hover:bg-blue-50/30">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-100 transition group-hover:text-blue-600">
                            <CalendarDays size={18} />
                          </div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Joined
                          </p>
                        </div>

                        <p className="mt-4 text-sm font-semibold text-slate-800">
                          {formatDate(student.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Account Summary */}
                    <div className="mt-6 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <User size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-700">
                          Student account
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          This profile contains the student's registered
                          academic information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Student Not Found */}
              {!loading && !error && !student && (
                <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                    <User size={20} className="text-slate-400" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Student not found.
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
