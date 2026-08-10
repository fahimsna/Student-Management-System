import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                <div className="bg-white border border-[#DEE2E6] rounded-lg p-5 shadow-sm">
                  <p className="text-sm text-[#6C757D]">Total Students</p>

                  <h2 className="text-3xl font-bold text-[#212529] mt-2">
                    120
                  </h2>
                </div>

                {/* Active Students */}
                <div className="bg-white border border-[#DEE2E6] rounded-lg p-5 shadow-sm">
                  <p className="text-sm text-[#6C757D]">Active Students</p>

                  <h2 className="text-3xl font-bold text-[#212529] mt-2">98</h2>
                </div>

                {/* New Students */}
                <div className="bg-white border border-[#DEE2E6] rounded-lg p-5 shadow-sm">
                  <p className="text-sm text-[#6C757D]">New Students</p>

                  <h2 className="text-3xl font-bold text-[#212529] mt-2">12</h2>
                </div>

                {/* Inactive Students */}
                <div className="bg-white border border-[#DEE2E6] rounded-lg p-5 shadow-sm">
                  <p className="text-sm text-[#6C757D]">Inactive Students</p>

                  <h2 className="text-3xl font-bold text-[#212529] mt-2">22</h2>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 bg-white border border-[#DEE2E6] rounded-lg shadow-sm p-5">
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
