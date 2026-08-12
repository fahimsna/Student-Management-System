import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
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

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const result = await createStudent(formData);

      console.log("Created Student:", result.data);

      setMessage("Student added successfully.");

      setFormData({
        name: "",
        email: "",
        department: "",
        semester: "",
        status: "Active",
      });
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to add student. Please try again.",
      );
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
          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#212529]">
                  Add Student
                </h1>

                <p className="mt-2 text-sm sm:text-base text-[#6C757D]">
                  Add a new student to the Student Management System.
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-5 sm:p-6">
                {/* Success Message */}
                {message && (
                  <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                  </div>
                )}

                {/* Error Message */}
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
                        placeholder="Enter student name"
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
                        placeholder="Enter student email"
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
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                        <option value="4">Semester 4</option>
                        <option value="5">Semester 5</option>
                        <option value="6">Semester 6</option>
                        <option value="7">Semester 7</option>
                        <option value="8">Semester 8</option>
                        <option value="9">Semester 9</option>
                        <option value="10">Semester 10</option>
                        <option value="11">Semester 11</option>
                        <option value="12">Semester 12</option>
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
                      className="rounded-lg bg-[#212529] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#343A40]"
                    >
                      Add Student
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          name: "",
                          email: "",
                          department: "",
                          semester: "",
                          status: "Active",
                        });

                        setMessage("");
                        setError("");
                      }}
                      className="rounded-lg border border-[#CED4DA] bg-white px-5 py-2.5 text-sm font-medium text-[#343A40] transition hover:bg-[#F8F9FA]"
                    >
                      Clear
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
