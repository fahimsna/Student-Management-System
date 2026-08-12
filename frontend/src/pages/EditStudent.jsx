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
  ArrowLeft,
  Save,
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

        console.log("Student:", result.data);

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
        console.log(error);

        setError(error.response?.data?.message || "Failed to load student.");
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
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter student name.";
    }

    if (!formData.email.trim()) {
      return "Please enter student email.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.department) {
      return "Please select a department.";
    }

    if (!formData.semester) {
      return "Please select a semester.";
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
        department: formData.department,
        semester: formData.semester,
        status: formData.status,
      });

      console.log("Update Student Response:", result.data);

      setSuccess("Student updated successfully.");

      setTimeout(() => {
        navigate(`/students/${id}`);
      }, 1000);
    } catch (error) {
      console.log("Update Student Error:", error);

      setError(error.response?.data?.message || "Failed to update student.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Right Side */}
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => navigate(`/students/${id}`)}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#495057] hover:text-[#212529] transition"
              >
                <ArrowLeft size={17} />
                Back to Student
              </button>

              {/* Header */}
              <div className="mt-5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#212529]">
                  Edit Student
                </h1>

                <p className="mt-2 text-sm sm:text-base text-[#6C757D]">
                  Update the student's information.
                </p>
              </div>

              {/* Loading */}
              {loading && (
                <div className="mt-6 bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-10 text-center">
                  <p className="text-sm text-[#6C757D]">
                    Loading student information...
                  </p>
                </div>
              )}

              {/* Error before form */}
              {!loading && error && !formData.name && (
                <div className="mt-6 bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-6">
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              )}

              {/* Form */}
              {!loading && formData.name && (
                <div className="mt-6 bg-white border border-[#DEE2E6] rounded-xl shadow-sm">
                  {/* Card Header */}
                  <div className="p-6 border-b border-[#DEE2E6]">
                    <h2 className="text-lg font-semibold text-[#212529]">
                      Student Information
                    </h2>

                    <p className="text-sm text-[#6C757D] mt-1">
                      Modify the information below and save your changes.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6">
                    {/* Error */}
                    {error && (
                      <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    {/* Success */}
                    {success && (
                      <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {success}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[#343A40] mb-2"
                        >
                          Student Name
                        </label>

                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D]"
                          />

                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[#CED4DA] py-2.5 pl-10 pr-4 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[#343A40] mb-2"
                        >
                          Email
                        </label>

                        <div className="relative">
                          <Mail
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D]"
                          />

                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[#CED4DA] py-2.5 pl-10 pr-4 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                          />
                        </div>
                      </div>

                      {/* Department */}
                      <div>
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium text-[#343A40] mb-2"
                        >
                          Department
                        </label>

                        <div className="relative">
                          <Building2
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D] pointer-events-none"
                          />

                          <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-lg border border-[#CED4DA] bg-white py-2.5 pl-10 pr-4 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                          >
                            <option value="">Select department</option>

                            <option value="CSE">
                              Computer Science & Engineering
                            </option>

                            <option value="EEE">
                              Electrical & Electronic Engineering
                            </option>

                            <option value="BBA">Business Administration</option>

                            <option value="Architecture">Architecture</option>

                            <option value="Economics">Economics</option>
                          </select>
                        </div>
                      </div>

                      {/* Semester */}
                      <div>
                        <label
                          htmlFor="semester"
                          className="block text-sm font-medium text-[#343A40] mb-2"
                        >
                          Semester
                        </label>

                        <div className="relative">
                          <GraduationCap
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D] pointer-events-none"
                          />

                          <select
                            id="semester"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-lg border border-[#CED4DA] bg-white py-2.5 pl-10 pr-4 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                          >
                            <option value="">Select semester</option>

                            {Array.from({ length: 12 }, (_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                Semester {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-[#343A40] mb-2"
                        >
                          Status
                        </label>

                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[#CED4DA] bg-white px-4 py-2.5 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                        >
                          <option value="Active">Active</option>

                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-[#DEE2E6]">
                      <button
                        type="button"
                        onClick={() => navigate(`/students/${id}`)}
                        disabled={saving}
                        className="rounded-lg border border-[#CED4DA] bg-white px-5 py-2.5 text-sm font-medium text-[#343A40] transition hover:bg-[#F8F9FA] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#212529] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#343A40] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Save size={17} />

                        {saving ? "Saving Changes..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
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
