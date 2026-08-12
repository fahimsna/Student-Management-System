import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  Users,
  BookOpen,
  BarChart3,
  Check,
} from "lucide-react";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = {
        email,
        password,
      };

      const result = await loginUser(data);

      // Save authentication token
      localStorage.setItem("token", result.data.token);

      // Save user name
      const name =
        result.data.name || result.data.user?.name || result.data.data?.name;

      if (name) {
        localStorage.setItem("userName", name);
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <section className="relative hidden overflow-hidden bg-[#eef3f8] lg:flex">
          <div className="absolute bottom-[-180px] left-[-150px] h-[420px] w-[420px] rounded-full bg-white/70 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col px-12 py-10 xl:px-16">
            {/* Brand */}
            <Link to="/" className="flex w-fit items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <GraduationCap size={21} />
              </div>

              <div>
                <p className="text-[15px] font-bold tracking-tight text-slate-900">
                  StudentMS
                </p>

                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Management System
                </p>
              </div>
            </Link>

            {/* Main */}
            <div className="flex flex-1 items-center">
              <div className="w-full max-w-xl">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Student management
                  </span>
                </div>

                <h1 className="max-w-lg text-[46px] font-semibold leading-[1.08] tracking-[-0.045em] text-slate-900 xl:text-[54px]">
                  Everything you need,
                  <span className="block text-slate-500">in one place.</span>
                </h1>

                <p className="mt-6 max-w-md text-[14px] leading-7 text-slate-500">
                  A simple workspace for managing students, organizing records,
                  and keeping important information accessible whenever you need
                  it.
                </p>

                {/* Dashboard Preview */}
                <div className="relative mt-10 max-w-[500px]">
                  <div className="rounded-2xl border border-white bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400">
                          Overview
                        </p>

                        <p className="mt-1 text-lg font-bold tracking-tight text-slate-800">
                          Student records
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <BarChart3 size={18} />
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <Users size={16} className="text-blue-600" />

                        <p className="mt-3 text-lg font-bold text-slate-800">
                          248
                        </p>

                        <p className="text-[10px] font-medium text-slate-400">
                          Students
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <BookOpen size={16} className="text-blue-600" />

                        <p className="mt-3 text-lg font-bold text-slate-800">
                          18
                        </p>

                        <p className="text-[10px] font-medium text-slate-400">
                          Classes
                        </p>
                      </div>

                      <div className="rounded-xl bg-blue-600 p-3">
                        <BarChart3 size={16} className="text-white" />

                        <p className="mt-3 text-lg font-bold text-white">96%</p>

                        <p className="text-[10px] font-medium text-blue-100">
                          Organized
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <div className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                            AS
                          </div>

                          <div>
                            <p className="text-[11px] font-bold text-slate-700">
                              Student record
                            </p>

                            <p className="text-[9px] text-slate-400">
                              Updated recently
                            </p>
                          </div>
                        </div>

                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-600">
                          <Check size={12} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-600">
                            MK
                          </div>

                          <div>
                            <p className="text-[11px] font-bold text-slate-700">
                              Student record
                            </p>

                            <p className="text-[9px] text-slate-400">
                              Information organized
                            </p>
                          </div>
                        </div>

                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-600">
                          <Check size={12} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-5 -right-5 hidden rounded-xl border border-white bg-white px-4 py-3 shadow-[0_15px_40px_rgba(15,23,42,0.08)] xl:block">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
                        <Check size={16} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-700">
                          Records organized
                        </p>

                        <p className="text-[9px] text-slate-400">
                          Everything is up to date
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small page text */}
            <div className="pt-5">
              <p className="text-[10px] font-medium text-slate-400">
                © 2026 StudentMS
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#f8fafc] to-transparent" />
        </section>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-10 flex justify-center lg:hidden">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <GraduationCap size={23} />
                </div>

                <div>
                  <p className="text-base font-bold tracking-tight text-slate-900">
                    StudentMS
                  </p>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Management System
                  </p>
                </div>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                Sign in
              </p>

              <h2 className="text-3xl font-bold tracking-[-0.035em] text-slate-900 sm:text-4xl">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details to access your StudentMS account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-bold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {message && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {message}
                </div>
              )}

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Register */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                New to StudentMS?
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <Link
              to="/register"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Create an account
            </Link>

            {/* Back */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-400 transition hover:text-blue-600"
              >
                ← Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
