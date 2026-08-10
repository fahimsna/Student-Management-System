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
              <h1 className="text-2xl sm:text-3xl font-bold text-[#212529]">
                Dashboard
              </h1>

              <p className="mt-2 text-sm sm:text-base text-[#6C757D]">
                Welcome to the Student Management System.
              </p>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
