import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Save,
  CheckCircle2,
} from "lucide-react";
import { getSingleStudent, updateStudent } from "../api/studentApi";

export default function EditStudent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    semester: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getSingleStudent(id);
        const student = result.data.student;

        if (!student) {
          setError("Student not found.");
          return;
        }

        setFormData({
          name: student.name || "",
          email: student.email || "",
          department: student.department || "",
          semester: student.semester || "",
          status: student.status || "Active",
        });
      } catch (error) {
        console.log("Load Student Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load student information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter student name.";
    }

    if (!formData.email.trim()) {
      return "Please enter student email.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!formData.department.trim()) {
      return "Please enter a department.";
    }

    if (!formData.semester) {
      return "Please select semester or class.";
    }

    if (!formData.status) {
      return "Please select student status.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const result = await updateStudent(id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department.trim(),
        semester: formData.semester,
        status: formData.status,
      });

      console.log("Update Student Response:", result.data);

      setSuccess("Student updated successfully.");

      setTimeout(() => {
        navigate(`/students/${id}`);
      }, 900);
    } catch (error) {
      console.log("Update Student Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update student. Please try again.",
      );
    } finally {
      setSaving(false);
    }
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
          MAIN APPLICATION LAYOUT
      ====================================================== */}
      <div className="flex min-h-0 flex-1">
        {/* ===================================================
            SIDEBAR
        ==================================================== */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* ===================================================
            RIGHT CONTENT
        ==================================================== */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-4xl">
              {/* =================================================
                  PAGE HEADER
              ================================================== */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Student management
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                  Edit Student
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Update the student's information and save your changes.
                </p>
              </div>

              {/* =================================================
                  LOADING
              ================================================== */}
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

              {/* =================================================
                  LOAD ERROR
              ================================================== */}
              {!loading && error && !formData.name && (
                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50 p-5">
                  <p className="text-sm font-medium text-red-700">{error}</p>

                  <button
                    type="button"
                    onClick={() => navigate("/students")}
                    className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600"
                  >
                    Back to Students
                  </button>
                </div>
              )}

              {/* =================================================
                  FORM CARD
              ================================================== */}
              {!loading && formData.name && (
                <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                  {/* Card Header */}
                  <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <User size={19} />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-slate-800">
                          Student information
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Make changes to the student's profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      FORM
                  ================================================== */}
                  <form
                    onSubmit={handleSubmit}
                    className="px-5 py-6 sm:px-7 sm:py-7"
                  >
                    {/* =================================================
                        ALERTS
                    ================================================== */}
                    {error && (
                      <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">
                        <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />

                        <p className="text-sm font-medium text-red-700">
                          {error}
                        </p>
                      </div>
                    )}

                    {success && (
                      <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3.5">
                        <CheckCircle2
                          size={17}
                          className="flex-shrink-0 text-emerald-600"
                        />

                        <p className="text-sm font-medium text-emerald-700">
                          {success}
                        </p>
                      </div>
                    )}

                    {/* =================================================
                        FORM GRID
                    ================================================== */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {/* =================================================
                          NAME
                      ================================================== */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-xs font-bold text-slate-700"
                        >
                          Student name
                        </label>

                        <div className="relative">
                          <User
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter student name"
                            disabled={saving}
                            autoComplete="name"
                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                          />
                        </div>
                      </div>

                      {/* =================================================
                          EMAIL
                      ================================================== */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-xs font-bold text-slate-700"
                        >
                          Email address
                        </label>

                        <div className="relative">
                          <Mail
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="student@example.com"
                            disabled={saving}
                            autoComplete="email"
                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                          />
                        </div>
                      </div>

                      {/* =================================================
                          DEPARTMENT - FREE TEXT
                      ================================================== */}
                      <div>
                        <label
                          htmlFor="department"
                          className="mb-2 block text-xs font-bold text-slate-700"
                        >
                          Department
                        </label>

                        <div className="relative">
                          <Building2
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="department"
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Enter department"
                            disabled={saving}
                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                          />
                        </div>

                        <p className="mt-1.5 text-[10px] text-slate-400">
                          Enter any department name.
                        </p>
                      </div>

                      {/* =================================================
                          SEMESTER / CLASS
                      ================================================== */}
                      <div>
                        <label
                          htmlFor="semester"
                          className="mb-2 block text-xs font-bold text-slate-700"
                        >
                          Semester / Class
                        </label>

                        <div className="relative">
                          <GraduationCap
                            size={17}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <select
                            id="semester"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            disabled={saving}
                            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-10 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <option value="">Select semester / class</option>

                            <optgroup label="University / Semester">
                              {Array.from({ length: 12 }, (_, index) => (
                                <option
                                  key={`semester-${index + 1}`}
                                  value={`Semester ${index + 1}`}
                                >
                                  Semester {index + 1}
                                </option>
                              ))}
                            </optgroup>

                            <optgroup label="School / Class">
                              {Array.from({ length: 12 }, (_, index) => (
                                <option
                                  key={`class-${index + 1}`}
                                  value={`Class ${index + 1}`}
                                >
                                  Class {index + 1}
                                </option>
                              ))}
                            </optgroup>
                          </select>

                          <svg
                            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <p className="mt-1.5 text-[10px] text-slate-400">
                          Choose the student's semester or school class.
                        </p>
                      </div>

                      {/* =================================================
                          STATUS
                      ================================================== */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="status"
                          className="mb-2 block text-xs font-bold text-slate-700"
                        >
                          Student status
                        </label>

                        <div className="relative w-full md:max-w-[calc(50%-0.625rem)]">
                          <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={saving}
                            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 pr-10 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>

                          <svg
                            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25-4.51a.75.75 0 011.08 1.04l-4.25-4.51a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================== */}
                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() => navigate(`/students/${id}`)}
                        disabled={saving}
                        className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={saving}
                        className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Save
                          size={16}
                          className={
                            saving
                              ? "animate-pulse"
                              : "transition-transform group-hover:scale-105"
                          }
                        />

                        {saving ? "Saving changes..." : "Save changes"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
