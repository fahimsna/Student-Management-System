import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getSingleStudent(id);

        const student = result.data.student;

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const result = await updateStudent(id, formData);

      console.log("Updated Student:", result.data);

      setMessage("Student updated successfully.");

      setTimeout(() => {
        navigate("/students");
      }, 1000);
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Failed to update student.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-1 min-h-0">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="flex-1 min-w-0 flex flex-col">
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-10 text-center">
                  <p className="text-sm text-[#6C757D]">Loading student...</p>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    );
  }

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
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#212529]">
                  Edit Student
                </h1>

                <p className="mt-2 text-sm sm:text-base text-[#6C757D]">
                  Update student information.
                </p>
              </div>

              {/* Form */}
              <div className="bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-5 sm:p-6">
                {/* Success */}
                {message && (
                  <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#343A40] mb-2"
                      >
                        Student Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-[#CED4DA] px-4 py-2.5 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#343A40] mb-2"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-[#CED4DA] px-4 py-2.5 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                      />
                    </div>

                    {/* Department */}
                    <div>
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium text-[#343A40] mb-2"
                      >
                        Department
                      </label>

                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-[#CED4DA] bg-white px-4 py-2.5 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                      >
                        <option value="">Select Department</option>

                        <option value="CSE">
                          Computer Science & Engineering
                        </option>

                        <option value="EEE">
                          Electrical & Electronic Engineering
                        </option>

                        <option value="BBA">Business Administration</option>

                        <option value="Architecture">Architecture</option>

                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Semester */}
                    <div>
                      <label
                        htmlFor="semester"
                        className="block text-sm font-medium text-[#343A40] mb-2"
                      >
                        Semester
                      </label>

                      <select
                        id="semester"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-[#CED4DA] bg-white px-4 py-2.5 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                      >
                        <option value="">Select Semester</option>

                        {Array.from({ length: 12 }, (_, index) => (
                          <option key={index + 1} value={String(index + 1)}>
                            Semester {index + 1}
                          </option>
                        ))}
                      </select>
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
                        required
                        className="w-full rounded-lg border border-[#CED4DA] bg-white px-4 py-2.5 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                      >
                        <option value="Active">Active</option>

                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-7">
                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-lg bg-[#212529] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#343A40] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? "Updating..." : "Update Student"}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/students")}
                      className="rounded-lg border border-[#CED4DA] bg-white px-5 py-2.5 text-sm font-medium text-[#343A40] transition hover:bg-[#F8F9FA]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
