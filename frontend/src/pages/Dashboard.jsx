import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Users, UserCheck, UserPlus, UserX } from "lucide-react";
import { getStudent } from "../api/studentApi";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getStudent();

        console.log("Students:", result.data.students);

        setStudents(result.data.students);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);

  // Total Students
  const totalStudents = students.length;

  // Active Students
  const activeStudents = students.filter(
    (student) => student.status === "Active",
  ).length;

  // Inactive Students
  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive",
  ).length;

  // New Students
  // Students created within the last 7 days
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const newStudents = students.filter((student) => {
    if (!student.createdAt) {
      return false;
    }

    const createdDate = new Date(student.createdAt);

    return createdDate >= sevenDaysAgo;
  }).length;

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

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {/* Total Students */}
                <div className="bg-white border border-[#DEE2E6] rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6C757D]">Total Students</p>

                      <h2 className="text-3xl font-bold text-[#212529] mt-2">
                        {totalStudents}
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
                        {activeStudents}
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
                        {newStudents}
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
                        {inactiveStudents}
                      </h2>
                    </div>

                    <div className="w-11 h-11 rounded-lg bg-[#E9ECEF] flex items-center justify-center">
                      <UserX size={22} className="text-[#343A40]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-semibold text-[#212529]">
                  Recent Activity
                </h2>

                <p className="text-sm text-[#6C757D] mt-2">
                  Student activities and updates will appear here.
                </p>
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
