import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Save,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { createStudent } from "../api/studentApi";

export default function AddStudent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    semester: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

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
      return "Please select a semester or class.";
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
      setLoading(true);

      const result = await createStudent({
        name: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department.trim(),
        semester: formData.semester,
        status: formData.status,
      });

      console.log("Create Student Response:", result.data);

      setSuccess("Student added successfully.");

      setFormData({
        name: "",
        email: "",
        department: "",
        semester: "",
        status: "Active",
      });

      setTimeout(() => {
        navigate("/students");
      }, 1000);
    } catch (error) {
      console.log("Create Student Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add student. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* =========================================================
          MAIN LAYOUT
      ========================================================== */}
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* =======================================================
            RIGHT SIDE
        ========================================================= */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-4xl">
              {/* =================================================
                  HEADER
              ================================================== */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Student management
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                  Add Student
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Create a new student profile and add them to the management
                  system.
                </p>
              </div>

              {/* =================================================
                  FORM CARD
              ================================================== */}
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
                        Enter the student's details below.
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
                          disabled={loading}
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
                          disabled={loading}
                          autoComplete="email"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                      </div>
                    </div>

                    {/* =================================================
                        DEPARTMENT
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
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="department"
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          placeholder="e.g. Computer Science"
                          disabled={loading}
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                      </div>

                      <p className="mt-1.5 text-[10px] text-slate-400">
                        Enter any department, program, or faculty name.
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
                          disabled={loading}
                          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-10 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="">Select semester / class</option>

                          <option value="Class 1">Class 1</option>
                          <option value="Class 2">Class 2</option>
                          <option value="Class 3">Class 3</option>
                          <option value="Class 4">Class 4</option>
                          <option value="Class 5">Class 5</option>
                          <option value="Class 6">Class 6</option>
                          <option value="Class 7">Class 7</option>
                          <option value="Class 8">Class 8</option>
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>

                          <option value="Semester 1">Semester 1</option>
                          <option value="Semester 2">Semester 2</option>
                          <option value="Semester 3">Semester 3</option>
                          <option value="Semester 4">Semester 4</option>
                          <option value="Semester 5">Semester 5</option>
                          <option value="Semester 6">Semester 6</option>
                          <option value="Semester 7">Semester 7</option>
                          <option value="Semester 8">Semester 8</option>
                          <option value="Semester 9">Semester 9</option>
                          <option value="Semester 10">Semester 10</option>
                          <option value="Semester 11">Semester 11</option>
                          <option value="Semester 12">Semester 12</option>
                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>

                      <p className="mt-1.5 text-[10px] text-slate-400">
                        Choose the student's current class or semester.
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
                          disabled={loading}
                          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 pr-10 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      ACTIONS
                  ================================================== */}
                  <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => navigate("/students")}
                      disabled={loading}
                      className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save
                        size={16}
                        className={
                          loading
                            ? "animate-pulse"
                            : "transition-transform group-hover:scale-105"
                        }
                      />

                      {loading ? "Adding student..." : "Add student"}
                    </button>
                  </div>
                </form>
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
