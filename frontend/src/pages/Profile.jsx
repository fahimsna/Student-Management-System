import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { getProfile, updateProfile } from "../api/authApi";
import {
  User,
  Mail,
  ShieldCheck,
  Pencil,
  CheckCircle2,
  X,
  Save,
} from "lucide-react";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getProfile();

        console.log("Profile Response:", result.data);

        const profileData = result.data?.user;

        if (!profileData) {
          setError("Profile information not found.");
          return;
        }

        setUser(profileData);

        setFormData({
          name: profileData.name || "",
          email: profileData.email || "",
        });
      } catch (err) {
        console.log("Profile Error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load profile. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleEdit = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });

    setError("");
    setSuccess("");
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });

    setError("");
    setSuccess("");
    setEditing(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const result = await updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
      });

      console.log("Update Profile Response:", result.data);

      const updatedUser = result.data?.user;

      if (!updatedUser) {
        throw new Error("Updated profile data was not returned.");
      }

      setUser(updatedUser);

      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
      });

      setSuccess("Profile updated successfully.");

      setEditing(false);
    } catch (err) {
      console.log("Update Profile Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  const getInitial = () => {
    if (!user?.name) {
      return "A";
    }

    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <div className="relative z-[100]">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* =========================================================
          PAGE LAYOUT
      ========================================================== */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* =======================================================
            SIDEBAR
        ======================================================== */}
        <div className="relative z-[40]">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* =======================================================
            CONTENT
        ======================================================== */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-5xl">
              {/* =================================================
                  PAGE HEADER
              ================================================== */}
              <div className="mb-7">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Account settings
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  My Profile
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Manage your personal account information.
                </p>
              </div>

              {/* =================================================
                  GLOBAL SUCCESS MESSAGE
              ================================================== */}
              {success && !editing && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3.5">
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-emerald-600"
                  />

                  <p className="text-sm font-semibold text-emerald-700">
                    {success}
                  </p>
                </div>
              )}

              {/* =================================================
                  LOADING
              ================================================== */}
              {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Loading profile...
                  </p>
                </div>
              )}

              {/* =================================================
                  ERROR
              ================================================== */}
              {!loading && error && !user && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {/* =================================================
                  PROFILE
              ================================================== */}
              {!loading && user && (
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.05)]">
                  {/* =================================================
                      PROFILE HERO
                  ================================================== */}
                  <div className="relative overflow-hidden bg-slate-900 px-6 py-8 sm:px-8 sm:py-10">
                    {/* Decorative shapes */}
                    <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-2xl" />

                    <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                      {/* Avatar */}
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xl ring-4 ring-white/10">
                        <span className="text-2xl font-extrabold text-slate-900">
                          {getInitial()}
                        </span>
                      </div>

                      {/* User information */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">
                            Account profile
                          </p>
                        </div>

                        <h2 className="truncate text-2xl font-bold text-white sm:text-3xl">
                          {user.name || "Account"}
                        </h2>

                        <p className="mt-1 break-all text-sm text-slate-400">
                          {user.email || "No email available"}
                        </p>
                      </div>

                      {/* Edit button */}
                      {!editing && (
                        <button
                          type="button"
                          onClick={handleEdit}
                          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-lg"
                        >
                          <Pencil size={16} />
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================== */}
                  <div className="p-5 sm:p-8">
                    {/* Section heading */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <User size={19} />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-800">
                          Personal information
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Your account details and preferences.
                        </p>
                      </div>
                    </div>

                    {/* =================================================
                        EDIT MODE
                    ================================================== */}
                    {editing ? (
                      <div>
                        {/* Edit error */}
                        {error && (
                          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">
                            <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                            <p className="text-sm font-medium text-red-700">
                              {error}
                            </p>
                          </div>
                        )}

                        {/* Edit success */}
                        {success && (
                          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3.5">
                            <CheckCircle2
                              size={17}
                              className="shrink-0 text-emerald-600"
                            />

                            <p className="text-sm font-medium text-emerald-700">
                              {success}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          {/* Name */}
                          <div>
                            <label
                              htmlFor="profile-name"
                              className="mb-2 block text-xs font-bold text-slate-700"
                            >
                              Full name
                            </label>

                            <div className="relative">
                              <User
                                size={17}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                id="profile-name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={saving}
                                placeholder="Enter your name"
                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <label
                              htmlFor="profile-email"
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
                                id="profile-email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={saving}
                                placeholder="Enter your email"
                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            onClick={handleCancel}
                            disabled={saving}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <X size={16} />
                            Cancel
                          </button>

                          <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Save size={16} />

                            {saving ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* =================================================
                         VIEW MODE
                      ================================================== */
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Name */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-slate-300 hover:bg-white">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                              <User size={17} />
                            </div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                              Full name
                            </p>
                          </div>

                          <p className="mt-4 text-sm font-semibold text-slate-800">
                            {user.name || "Not provided"}
                          </p>
                        </div>

                        {/* Email */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-slate-300 hover:bg-white">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                              <Mail size={17} />
                            </div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                              Email address
                            </p>
                          </div>

                          <p className="mt-4 break-all text-sm font-semibold text-slate-800">
                            {user.email || "Not provided"}
                          </p>
                        </div>

                        {/* Role */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-slate-300 hover:bg-white">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                              <ShieldCheck size={17} />
                            </div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                              Role
                            </p>
                          </div>

                          <div className="mt-4">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                              {user.role || "Account"}
                            </span>
                          </div>
                        </div>

                        {/* Account status */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-slate-300 hover:bg-white">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                              <CheckCircle2 size={17} />
                            </div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                              Account status
                            </p>
                          </div>

                          <div className="mt-4">
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  EMPTY
              ================================================== */}
              {!loading && !error && !user && (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                    <User size={24} className="text-slate-400" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Profile information not found.
                  </p>
                </div>
              )}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
