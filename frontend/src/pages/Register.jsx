import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  User,
  Users,
  BookOpen,
  Check,
  ShieldCheck,
} from "lucide-react";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const data = {
        name,
        email,
        password,
      };

      const result = await registerUser(data);

      setMessage(result.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
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
          {/* Soft decorative shapes */}
          <div className="absolute -left-40 -top-40 h-[460px] w-[460px] rounded-full bg-white/70 blur-3xl" />

          <div className="absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-blue-100/40 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col px-12 py-10 xl:px-16">
            {/* Brand */}
            <Link to="/" className="flex w-fit items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
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

            {/* Main content */}
            <div className="flex flex-1 items-center">
              <div className="w-full max-w-xl">
                {/* Label */}
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Get started
                  </span>
                </div>

                {/* Heading */}
                <h1 className="max-w-lg text-[46px] font-semibold leading-[1.08] tracking-[-0.045em] text-slate-900 xl:text-[54px]">
                  Manage your
                  <span className="block text-slate-500">student world.</span>
                </h1>

                <p className="mt-6 max-w-md text-[14px] leading-7 text-slate-500">
                  Create your account and bring student records, information,
                  and everyday management into one organized workspace.
                </p>

                {/* Benefits */}
                <div className="mt-9 max-w-[470px] space-y-3">
                  <div className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_35px_rgba(15,23,42,0.04)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Users size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Keep student records organized
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-400">
                        Access important student information from one place.
                      </p>
                    </div>

                    <div className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <Check size={13} />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_35px_rgba(15,23,42,0.04)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <BookOpen size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Simple and easy to use
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-400">
                        Designed to keep everyday management straightforward.
                      </p>
                    </div>

                    <div className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <Check size={13} />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_35px_rgba(15,23,42,0.04)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <ShieldCheck size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Built with security in mind
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-400">
                        Your account stays protected while you work.
                      </p>
                    </div>

                    <div className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <Check size={13} />
                    </div>
                  </div>
                </div>

                {/* Small bottom message */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                    <GraduationCap size={16} />
                  </div>

                  <p className="text-[11px] font-medium text-slate-400">
                    Everything you need for smarter student management.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Soft transition */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#f8fafc] to-transparent" />
        </section>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-9 flex justify-center lg:hidden">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
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
            <div className="mb-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                Create account
              </p>

              <h2 className="text-3xl font-bold tracking-[-0.035em] text-slate-900 sm:text-4xl">
                Get started.
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Create your StudentMS account and start managing your student
                information.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-bold text-slate-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
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

              {/* Password note */}
              <div className="flex items-center gap-2 px-1 pt-1">
                <div className="h-1 w-1 rounded-full bg-slate-300" />

                <p className="text-[10px] font-medium text-slate-400">
                  Choose a password you can remember easily.
                </p>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                    message.toLowerCase().includes("success") ||
                    message.toLowerCase().includes("registered")
                      ? "border-green-100 bg-green-50 text-green-600"
                      : "border-red-100 bg-red-50 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Register button */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Login divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Already registered?
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Sign in instead
            </Link>

            {/* Home */}
            <div className="mt-7 text-center">
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
