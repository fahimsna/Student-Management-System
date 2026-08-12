import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { getProfile } from "../api/authApi";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getProfile();

        console.log("Profile Response:", result.data);

        setUser(result.data.user);
      } catch (error) {
        console.log("Profile Error:", error);

        setError(error.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
                  Profile
                </h1>

                <p className="mt-2 text-sm sm:text-base text-[#6C757D]">
                  View your account information.
                </p>
              </div>

              {/* Loading */}
              {loading && (
                <div className="bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-10 text-center">
                  <p className="text-sm text-[#6C757D]">Loading profile...</p>
                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div className="bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-6">
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              )}

              {/* Profile */}
              {!loading && !error && user && (
                <div className="bg-white border border-[#DEE2E6] rounded-xl shadow-sm overflow-hidden">
                  {/* Profile Header */}
                  <div className="bg-[#343A40] px-6 py-8 sm:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#343A40]">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          {user.name || "User"}
                        </h2>

                        <p className="mt-1 text-sm text-[#CED4DA]">
                          {user.email || "No email available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-lg font-semibold text-[#212529] mb-5">
                      Account Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="rounded-lg border border-[#DEE2E6] p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#6C757D]">
                          Name
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#212529]">
                          {user.name || "N/A"}
                        </p>
                      </div>

                      {/* Email */}
                      <div className="rounded-lg border border-[#DEE2E6] p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#6C757D]">
                          Email
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#212529] break-all">
                          {user.email || "N/A"}
                        </p>
                      </div>

                      {/* Role */}
                      <div className="rounded-lg border border-[#DEE2E6] p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#6C757D]">
                          Role
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#212529]">
                          {user.role || "User"}
                        </p>
                      </div>

                      {/* Account ID */}
                      <div className="rounded-lg border border-[#DEE2E6] p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#6C757D]">
                          Account ID
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#212529] break-all">
                          {user._id || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* No User */}
              {!loading && !error && !user && (
                <div className="bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-10 text-center">
                  <p className="text-sm text-[#6C757D]">
                    Profile information not found.
                  </p>
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
