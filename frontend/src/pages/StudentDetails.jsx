import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  ArrowLeft,
  Mail,
  Building2,
  GraduationCap,
  CalendarDays,
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

        console.log("Student Details:", result.data);

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
              {/* Back */}
              <button
                onClick={() => navigate("/students")}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#495057] hover:text-[#212529] transition"
              >
                <ArrowLeft size={17} />
                Back to Students
              </button>

              {/* Header */}
              <div className="mt-5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#212529]">
                  Student Details
                </h1>

                <p className="mt-2 text-sm sm:text-base text-[#6C757D]">
                  View complete student information.
                </p>
              </div>

              {/* Loading */}
              {loading && (
                <div className="mt-6 bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-10 text-center">
                  <p className="text-sm text-[#6C757D]">Loading student...</p>
                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div className="mt-6 bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-6">
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              )}

              {/* Student */}
              {!loading && !error && student && (
                <div className="mt-6 bg-white border border-[#DEE2E6] rounded-xl shadow-sm overflow-hidden">
                  {/* Profile Header */}
                  <div className="bg-[#343A40] px-6 py-8 sm:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#343A40]">
                          {student.name
                            ? student.name.charAt(0).toUpperCase()
                            : "S"}
                        </span>
                      </div>

                      {/* Name */}
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          {student.name}
                        </h2>

                        <p className="mt-1 text-sm text-[#CED4DA]">
                          {student.email}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="sm:ml-auto">
                        <span
                          className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-medium ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.status || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-lg font-semibold text-[#212529] mb-5">
                      Student Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Email */}
                      <div className="rounded-lg border border-[#DEE2E6] p-5">
                        <div className="flex items-center gap-3">
                          <Mail size={19} className="text-[#495057]" />

                          <p className="text-xs font-medium uppercase tracking-wide text-[#6C757D]">
                            Email
                          </p>
                        </div>

                        <p className="mt-3 text-sm font-medium text-[#212529] break-all">
                          {student.email || "N/A"}
                        </p>
                      </div>

                      {/* Department */}
                      <div className="rounded-lg border border-[#DEE2E6] p-5">
                        <div className="flex items-center gap-3">
                          <Building2 size={19} className="text-[#495057]" />

                          <p className="text-xs font-medium uppercase tracking-wide text-[#6C757D]">
                            Department
                          </p>
                        </div>

                        <p className="mt-3 text-sm font-medium text-[#212529]">
                          {student.department || "N/A"}
                        </p>
                      </div>

                      {/* Semester */}
                      <div className="rounded-lg border border-[#DEE2E6] p-5">
                        <div className="flex items-center gap-3">
                          <GraduationCap size={19} className="text-[#495057]" />

                          <p className="text-xs font-medium uppercase tracking-wide text-[#6C757D]">
                            Semester
                          </p>
                        </div>

                        <p className="mt-3 text-sm font-medium text-[#212529]">
                          {student.semester
                            ? `Semester ${student.semester}`
                            : "N/A"}
                        </p>
                      </div>

                      {/* Joined */}
                      <div className="rounded-lg border border-[#DEE2E6] p-5">
                        <div className="flex items-center gap-3">
                          <CalendarDays size={19} className="text-[#495057]" />

                          <p className="text-xs font-medium uppercase tracking-wide text-[#6C757D]">
                            Joined
                          </p>
                        </div>

                        <p className="mt-3 text-sm font-medium text-[#212529]">
                          {formatDate(student.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-7">
                      <button
                        onClick={() =>
                          navigate(`/students/edit/${student._id}`)
                        }
                        className="rounded-lg bg-[#212529] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#343A40]"
                      >
                        Edit Student
                      </button>

                      <button
                        onClick={() => navigate("/students")}
                        className="rounded-lg border border-[#CED4DA] bg-white px-5 py-2.5 text-sm font-medium text-[#343A40] transition hover:bg-[#F8F9FA]"
                      >
                        Back to Students
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* No Student */}
              {!loading && !error && !student && (
                <div className="mt-6 bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-10 text-center">
                  <p className="text-sm text-[#6C757D]">Student not found.</p>
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
