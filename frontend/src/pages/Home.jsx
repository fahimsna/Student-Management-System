import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Menu,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description:
      "Keep student profiles, information, and records organized in one convenient workspace.",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description:
      "See important student statistics and activity at a glance from a clean dashboard.",
  },
  {
    icon: ClipboardList,
    title: "Organized Records",
    description:
      "Create, update, view, and manage student records without unnecessary complexity.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description:
      "Keep your management workspace protected with secure account-based access.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Register your account and enter your personal student management workspace.",
  },
  {
    number: "02",
    title: "Add students",
    description:
      "Create student records and keep important information organized.",
  },
  {
    number: "03",
    title: "Manage everything",
    description:
      "Search, review, edit, and manage your student information whenever needed.",
  },
];

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {/* ==================== NAVBAR ==================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <GraduationCap size={22} strokeWidth={2.2} />
            </div>

            <div>
              <div className="text-[16px] font-extrabold leading-none tracking-tight text-slate-900">
                StudentMS
              </div>

              <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Management System
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              How it works
            </a>

            <a
              href="#about"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              About
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Get Started
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenu((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col">
              <a
                href="#features"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
              >
                How it works
              </a>

              <a
                href="#about"
                onClick={closeMobileMenu}
                className="border-b border-slate-100 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
              >
                About
              </a>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-blue-50/50">
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-24">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <Sparkles size={12} />
                </span>
                Simple. Organized. Powerful.
              </div>

              <h1 className="mx-auto max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:mx-0 lg:text-6xl xl:text-7xl">
                Manage your students
                <span className="block text-blue-600">with confidence.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8 lg:mx-0">
                A modern student management system designed to make student
                records easier to organize, access, and manage.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-700"
                >
                  Get Started
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex -space-x-2">
                  {["F", "S", "M"].map((letter, index) => (
                    <div
                      key={letter}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-extrabold text-white ${
                        index === 0
                          ? "bg-blue-600"
                          : index === 1
                            ? "bg-slate-500"
                            : "bg-indigo-600"
                      }`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                <div className="text-left">
                  <div className="text-[11px] tracking-widest text-amber-500">
                    ★★★★★
                  </div>

                  <p className="text-[11px] font-semibold text-slate-400">
                    Built for simple student management
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
              <div className="absolute inset-8 rounded-[2rem] bg-blue-200/40 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                {/* Preview Topbar */}
                <div className="flex h-12 items-center justify-between border-b border-slate-100 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
                      <GraduationCap size={13} />
                    </div>

                    <span className="text-[10px] font-extrabold text-slate-700">
                      StudentMS
                    </span>
                  </div>

                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-[8px] font-bold text-white">
                    A
                  </div>
                </div>

                <div className="flex min-h-[360px]">
                  {/* Preview Sidebar */}
                  <div className="hidden w-28 shrink-0 border-r border-slate-100 bg-slate-50/70 p-3 sm:block">
                    {[
                      [BarChart3, "Dashboard"],
                      [Users, "Students"],
                      [ClipboardList, "Records"],
                    ].map(([Icon, label], index) => (
                      <div
                        key={label}
                        className={`mb-1 flex items-center gap-2 rounded-md px-2 py-2 text-[8px] font-bold ${
                          index === 0
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        <Icon size={12} />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Preview Content */}
                  <div className="min-w-0 flex-1 p-4 sm:p-5">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <p className="text-[8px] font-semibold text-slate-400">
                          Overview
                        </p>

                        <h3 className="mt-1 text-lg font-extrabold tracking-tight text-slate-800">
                          Dashboard
                        </h3>
                      </div>

                      <span className="rounded-md bg-slate-50 px-2 py-1 text-[8px] font-bold text-slate-500">
                        Today
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                          <Users size={14} />
                        </div>

                        <p className="text-[8px] font-semibold text-slate-400">
                          Total Students
                        </p>

                        <p className="mt-1 text-base font-black text-slate-800">
                          1,248
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                          <ClipboardList size={14} />
                        </div>

                        <p className="text-[8px] font-semibold text-slate-400">
                          Records
                        </p>

                        <p className="mt-1 text-base font-black text-slate-800">
                          1,102
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-slate-100 p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-[8px] font-semibold text-slate-400">
                            Student overview
                          </p>

                          <p className="mt-0.5 text-[10px] font-bold text-slate-700">
                            Recent students
                          </p>
                        </div>

                        <span className="text-[8px] font-bold text-blue-600">
                          View all
                        </span>
                      </div>

                      {[
                        ["AR", "Alex Rahman", "Computer Science"],
                        ["NS", "Nadia Smith", "Business Studies"],
                        ["JR", "James Roy", "Engineering"],
                      ].map(([initials, name, course], index) => (
                        <div
                          key={name}
                          className="flex items-center gap-2 border-t border-slate-100 py-2"
                        >
                          <div
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[7px] font-black ${
                              index === 0
                                ? "bg-blue-50 text-blue-600"
                                : index === 1
                                  ? "bg-violet-50 text-violet-600"
                                  : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            {initials}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[8px] font-bold text-slate-700">
                              {name}
                            </p>

                            <p className="truncate text-[7px] text-slate-400">
                              {course}
                            </p>
                          </div>

                          <span className="rounded-full bg-emerald-50 px-1.5 py-1 text-[6px] font-extrabold text-emerald-600">
                            Active
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Updated Card */}
              <div className="absolute -bottom-4 -left-2 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl sm:flex lg:-left-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <p className="text-[9px] font-bold text-slate-700">
                    Record updated
                  </p>

                  <p className="text-[7px] text-slate-400">Just now</p>
                </div>
              </div>

              {/* Floating Growth Card */}
              <div className="absolute -right-2 top-10 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl sm:flex lg:-right-7">
                <div className="flex h-8 w-10 items-end justify-center gap-1">
                  {[8, 13, 11, 18, 23].map((height, index) => (
                    <span
                      key={index}
                      className={`w-1.5 rounded-t ${
                        index === 4
                          ? "bg-blue-600"
                          : index === 3
                            ? "bg-blue-400"
                            : "bg-blue-200"
                      }`}
                      style={{ height }}
                    />
                  ))}
                </div>

                <div>
                  <p className="text-[9px] font-bold text-slate-700">+18.4%</p>

                  <p className="text-[7px] text-slate-400">Student growth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Bottom Strip */}
          <div className="border-t border-slate-200/70 bg-white/60">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
              <span className="text-center text-[11px] font-bold text-slate-400 md:text-left">
                Everything you need to manage student records
              </span>

              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {["Easy to use", "Secure access", "Organized records"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"
                    >
                      <CheckCircle2 size={14} className="text-blue-600" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== FEATURES ==================== */}
        <section
          id="features"
          className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-[10px] font-black tracking-[0.16em] text-blue-600">
                FEATURES
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Everything stays organized.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Designed around the everyday tasks of managing students, without
                the clutter of complicated software.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-900/5"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        index === 0
                          ? "bg-blue-50 text-blue-600"
                          : index === 1
                            ? "bg-violet-50 text-violet-600"
                            : index === 2
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-6 text-base font-extrabold tracking-tight text-slate-800">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {feature.description}
                    </p>

                    <div className="mt-6 flex items-center gap-1 text-[10px] font-extrabold text-blue-600">
                      Learn more
                      <ChevronRight
                        size={14}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== ABOUT ==================== */}
        <section
          id="about"
          className="border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[10px] font-black tracking-[0.16em] text-blue-600">
                BUILT FOR CLARITY
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Less time searching.
                <span className="block text-blue-600">More time managing.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Student information shouldn't be scattered across spreadsheets
                and disconnected documents. StudentMS gives you a focused
                workspace where important records can be managed from one place.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Centralized student information",
                  "Fast access to important records",
                  "Straightforward management workflow",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-xs font-bold text-slate-600"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-blue-600"
                    />

                    {item}
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 transition hover:text-blue-700"
              >
                Start managing students
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-7 text-white shadow-2xl shadow-slate-900/15 sm:p-9">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400">
                      Built around your workflow
                    </p>

                    <h3 className="mt-1 text-lg font-extrabold">
                      Simple by design.
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <BookOpen size={20} />
                  </div>
                </div>

                <div className="mt-12 flex items-end gap-3">
                  <strong className="text-6xl font-black tracking-tighter">
                    01
                  </strong>

                  <span className="pb-2 text-[10px] font-bold text-slate-400">
                    centralized workspace
                  </span>
                </div>

                <div className="my-7 h-px bg-white/10" />

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <strong className="text-2xl font-black">100%</strong>

                    <p className="mt-1 text-[9px] text-slate-400">
                      focused on simplicity
                    </p>
                  </div>

                  <div>
                    <strong className="text-2xl font-black">24/7</strong>

                    <p className="mt-1 text-[9px] text-slate-400">
                      access to your records
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5 text-[9px] font-bold text-slate-300">
                  <CheckCircle2 size={16} className="text-blue-400" />
                  Your records, organized in one place.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== HOW IT WORKS ==================== */}
        <section
          id="how-it-works"
          className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] font-black tracking-[0.16em] text-blue-600">
                HOW IT WORKS
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Get up and running in minutes.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                A straightforward workflow that keeps student management simple
                from day one.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-100 hover:bg-white hover:shadow-lg"
                >
                  <span className="text-[11px] font-black tracking-[0.12em] text-blue-600">
                    {step.number}
                  </span>

                  <h3 className="mt-8 text-base font-extrabold tracking-tight text-slate-800">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <ArrowRight
                      size={19}
                      className="absolute right-5 top-6 hidden text-slate-300 md:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CTA ==================== */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-center sm:px-10 lg:py-20">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.16em] text-blue-300">
                <Sparkles size={13} />
                READY TO GET STARTED?
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Make student management simpler.
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-400">
                Create your account and start building a more organized student
                management workflow today.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/register"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-slate-900 transition hover:-translate-y-1 hover:bg-blue-50 sm:w-auto"
                >
                  Create your account
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/login"
                  className="text-xs font-bold text-slate-400 transition hover:text-white"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 text-center sm:px-6 lg:px-8">
          <span className="text-[9px] font-semibold text-slate-400">
            © {new Date().getFullYear()} StudentMS. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
