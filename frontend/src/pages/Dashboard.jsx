import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Users, UserCheck, UserPlus, UserX, CalendarDays } from "lucide-react";
import { getStudent } from "../api/studentApi";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getStudent();

        console.log("Students:", result.data.students);

        setStudents(result.data.students || []);
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message || "Failed to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  /*
    Active Students
  */
  const activeStudents = students.filter(
    (student) => student.status === "Active",
  ).length;

  /*
    Inactive Students
  */
  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive",
  ).length;

  /*
    New Students
    Students registered within the last 30 days.
  */
  const thirtyDaysAgo = new Date();

  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const newStudents = students.filter((student) => {
    if (!student.createdAt) {
      return false;
    }

    const createdDate = new Date(student.createdAt);

    return createdDate >= thirtyDaysAgo;
  }).length;

  /*
    Recent Students
    Sort by createdAt and show the latest 5.
  */
  const recentStudents = [...students]
    .sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    })
    .slice(0, 5);

  /*
    Format date
  */
  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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
          {/* Dashboard Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#212529]">
                  Dashboard
                </h1>

                <p className="mt-2 text-sm sm:text-base text-[#6C757D]">
                  Welcome to the Student Management System.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {/* Total Students */}
                <div className="bg-white border border-[#DEE2E6] rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6C757D]">Total Students</p>

                      <h2 className="text-3xl font-bold text-[#212529] mt-2">
                        {loading ? "..." : students.length}
                      </h2>
                    </div>

                    <div className="w-11 h-11 rounded-lg bg-[#E9ECEF] flex items-center justify-center">
                      <Users size={22} className="text-[#343A40]" />
                    </div>
                  </div>
                </div>

                {/* Active Students */}
                <div className="bg-white border border-[#DEE2E6] rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6C757D]">Active Students</p>

                      <h2 className="text-3xl font-bold text-[#212529] mt-2">
                        {loading ? "..." : activeStudents}
                      </h2>
                    </div>

                    <div className="w-11 h-11 rounded-lg bg-[#E9ECEF] flex items-center justify-center">
                      <UserCheck size={22} className="text-[#343A40]" />
                    </div>
                  </div>
                </div>

                {/* New Students */}
                <div className="bg-white border border-[#DEE2E6] rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6C757D]">New Students</p>

                      <h2 className="text-3xl font-bold text-[#212529] mt-2">
                        {loading ? "..." : newStudents}
                      </h2>
                    </div>

                    <div className="w-11 h-11 rounded-lg bg-[#E9ECEF] flex items-center justify-center">
                      <UserPlus size={22} className="text-[#343A40]" />
                    </div>
                  </div>
                </div>

                {/* Inactive Students */}
                <div className="bg-white border border-[#DEE2E6] rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6C757D]">
                        Inactive Students
                      </p>

                      <h2 className="text-3xl font-bold text-[#212529] mt-2">
                        {loading ? "..." : inactiveStudents}
                      </h2>
                    </div>

                    <div className="w-11 h-11 rounded-lg bg-[#E9ECEF] flex items-center justify-center">
                      <UserX size={22} className="text-[#343A40]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 bg-white border border-[#DEE2E6] rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-[#DEE2E6] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-[#212529]">
                      Recent Activity
                    </h2>

                    <p className="text-sm text-[#6C757D] mt-1">
                      Recently added students.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      window.location.href = "/students";
                    }}
                    className="text-sm font-medium text-[#495057] hover:text-[#212529] transition"
                  >
                    View All
                  </button>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="p-8 text-center">
                    <p className="text-sm text-[#6C757D]">
                      Loading recent activity...
                    </p>
                  </div>
                )}

                {/* Empty */}
                {!loading && recentStudents.length === 0 && (
                  <div className="p-8 text-center">
                    <Users size={36} className="mx-auto text-[#ADB5BD]" />

                    <p className="mt-3 text-sm text-[#6C757D]">
                      No student activity yet.
                    </p>
                  </div>
                )}

                {/* Students */}
                {!loading && recentStudents.length > 0 && (
                  <div className="divide-y divide-[#DEE2E6]">
                    {recentStudents.map((student) => (
                      <div
                        key={student._id}
                        className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-[#F8F9FA] transition"
                      >
                        {/* Student Info */}
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className="w-11 h-11 rounded-full bg-[#E9ECEF] flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-[#343A40]">
                              {student.name
                                ? student.name.charAt(0).toUpperCase()
                                : "S"}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-medium text-[#212529] truncate">
                              {student.name}
                            </h3>

                            <p className="text-sm text-[#6C757D] mt-1 truncate">
                              {student.email}
                            </p>

                            <p className="text-xs text-[#868E96] mt-1">
                              {student.department} • Semester {student.semester}
                            </p>
                          </div>
                        </div>

                        {/* Activity Info */}
                        <div className="flex items-center gap-4 sm:justify-end">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-sm text-[#6C757D]">
                            <CalendarDays size={16} />

                            <span>{formatDate(student.createdAt)}</span>
                          </div>

                          {/* Status */}
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                              student.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.status || "Unknown"}
                          </span>
                        </div>
                      </div>
                    ))}
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
