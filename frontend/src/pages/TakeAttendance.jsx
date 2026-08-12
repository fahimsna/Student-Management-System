import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { getStudent } from "../api/studentApi";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Search,
  UserCheck,
  Users,
  X,
  ChevronDown,
} from "lucide-react";

export default function TakeAttendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [allStudents, setAllStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [search, setSearch] = useState("");

  const [loaded, setLoaded] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     LOAD ALL STUDENTS
  ========================================================= */

  useEffect(() => {
    const loadAllStudents = async () => {
      try {
        setStudentsLoading(true);
        setError("");

        const result = await getStudent();

        const fetchedStudents = result?.data?.students || [];

        setAllStudents(fetchedStudents);
      } catch (err) {
        console.error("Failed to load students:", err);

        setError(
          err.response?.data?.message || "Failed to load student information.",
        );
      } finally {
        setStudentsLoading(false);
      }
    };

    loadAllStudents();
  }, []);

  /* =========================================================
     DEPARTMENT OPTIONS
  ========================================================= */

  const departments = useMemo(() => {
    const values = allStudents
      .map((student) => student.department)
      .filter(Boolean)
      .map((value) => String(value).trim());

    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }, [allStudents]);

  /* =========================================================
     SEMESTER / CLASS OPTIONS
     
     Only show options belonging to selected department.
  ========================================================= */

  const semesters = useMemo(() => {
    const values = allStudents
      .filter((student) => {
        if (!department) {
          return true;
        }

        return (
          String(student.department || "")
            .trim()
            .toLowerCase() === department.toLowerCase()
        );
      })
      .map((student) => student.semester)
      .filter(Boolean)
      .map((value) => String(value).trim());

    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }, [allStudents, department]);

  /* =========================================================
     RESET SEMESTER WHEN DEPARTMENT CHANGES
  ========================================================= */

  useEffect(() => {
    if (
      semester &&
      !semesters.some((item) => item.toLowerCase() === semester.toLowerCase())
    ) {
      setSemester("");
    }

    setLoaded(false);
    setStudents([]);
    setAttendance({});
  }, [department, semesters, semester]);

  /* =========================================================
     LOAD STUDENTS FOR SELECTED CLASS
  ========================================================= */

  const loadStudents = () => {
    setError("");
    setSuccess("");

    if (!department) {
      setError("Please select a department.");
      return;
    }

    if (!semester) {
      setError("Please select a semester or class.");
      return;
    }

    if (!date) {
      setError("Please select an attendance date.");
      return;
    }

    try {
      setLoadingStudents(true);

      const departmentValue = department.trim().toLowerCase();

      const semesterValue = semester.trim().toLowerCase();

      const filtered = allStudents.filter((student) => {
        const studentDepartment = String(student.department || "")
          .trim()
          .toLowerCase();

        const studentSemester = String(student.semester || "")
          .trim()
          .toLowerCase();

        return (
          studentDepartment === departmentValue &&
          studentSemester === semesterValue
        );
      });

      const formattedStudents = filtered.map((student) => ({
        id: student._id,
        name: student.name || "Unnamed Student",
        email: student.email || "No email available",
        department: student.department || "",
        semester: student.semester || "",
      }));

      setStudents(formattedStudents);
      setAttendance({});
      setLoaded(true);

      if (formattedStudents.length === 0) {
        setError("No students were found for this department and semester.");
      }
    } catch (err) {
      console.error(err);

      setError("Failed to load students. Please try again.");
    } finally {
      setLoadingStudents(false);
    }
  };

  /* =========================================================
     CHANGE ATTENDANCE
  ========================================================= */

  const changeAttendance = (studentId, status) => {
    setAttendance((previous) => ({
      ...previous,
      [studentId]: status,
    }));

    setSuccess("");
    setError("");
  };

  /* =========================================================
     MARK ALL
  ========================================================= */

  const markAll = (status) => {
    const updatedAttendance = {};

    students.forEach((student) => {
      updatedAttendance[student.id] = status;
    });

    setAttendance(updatedAttendance);

    setSuccess("");
    setError("");
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!students.length) {
      setError("Please load students before saving attendance.");
      return;
    }

    const missingAttendance = students.some(
      (student) => !attendance[student.id],
    );

    if (missingAttendance) {
      setError("Please mark attendance for every student.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        date,
        department,
        semester,
        attendance: students.map((student) => ({
          studentId: student.id,
          status: attendance[student.id],
        })),
      };

      console.log("Attendance payload:", payload);

      /*
       * Backend attendance API will be connected here.
       */

      await new Promise((resolve) => setTimeout(resolve, 700));

      setSuccess("Attendance prepared successfully.");
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredStudents = students.filter((student) => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return true;
    }

    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue)
    );
  });

  /* =========================================================
     COUNTS
  ========================================================= */

  const presentCount = students.filter(
    (student) => attendance[student.id] === "Present",
  ).length;

  const absentCount = students.filter(
    (student) => attendance[student.id] === "Absent",
  ).length;

  const lateCount = students.filter(
    (student) => attendance[student.id] === "Late",
  ).length;

  const unmarkedCount =
    students.length - presentCount - absentCount - lateCount;

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      {/* Navbar */}

      <div className="relative z-[100]">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Layout */}

      <div className="flex min-h-0 flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">
              {/* =================================================
                  HEADER
              ================================================== */}

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Attendance management
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                  Take Attendance
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Select a department, semester or class, and record student
                  attendance.
                </p>
              </div>

              {/* =================================================
                  FILTER CARD
              ================================================== */}

              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <ClipboardCheck size={19} />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        Attendance details
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Select the class you want to take attendance for.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 px-5 py-6 sm:px-7 md:grid-cols-3">
                  {/* Department */}

                  <SelectField
                    id="department"
                    label="Department"
                    value={department}
                    onChange={(value) => {
                      setDepartment(value);
                      setSuccess("");
                      setError("");
                    }}
                    placeholder={
                      studentsLoading
                        ? "Loading departments..."
                        : departments.length
                          ? "Select department"
                          : "No departments available"
                    }
                    options={departments}
                    disabled={studentsLoading || departments.length === 0}
                  />

                  {/* Semester */}

                  <SelectField
                    id="semester"
                    label="Semester / Class"
                    value={semester}
                    onChange={(value) => {
                      setSemester(value);
                      setSuccess("");
                      setError("");
                    }}
                    placeholder={
                      !department
                        ? "Select department first"
                        : semesters.length
                          ? "Select semester / class"
                          : "No classes available"
                    }
                    options={semesters}
                    disabled={!department || semesters.length === 0}
                  />

                  {/* Date */}

                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Attendance date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Load */}

                <div className="border-t border-slate-100 px-5 py-4 sm:px-7">
                  <button
                    type="button"
                    onClick={loadStudents}
                    disabled={
                      loadingStudents ||
                      studentsLoading ||
                      !department ||
                      !semester
                    }
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    <Users size={16} />

                    {loadingStudents ? "Loading Students..." : "Load Students"}
                  </button>
                </div>
              </div>

              {/* =================================================
                  ALERTS
              ================================================== */}

              {error && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />

                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {success && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3.5">
                  <CheckCircle2
                    size={17}
                    className="flex-shrink-0 text-emerald-600"
                  />

                  <p className="text-sm font-medium text-emerald-700">
                    {success}
                  </p>
                </div>
              )}

              {/* =================================================
                  ATTENDANCE AREA
              ================================================== */}

              {loaded && students.length > 0 && (
                <>
                  {/* Summary */}

                  <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <SummaryCard
                      icon={Users}
                      label="Total Students"
                      value={students.length}
                      iconClass="bg-blue-50 text-blue-600"
                    />

                    <SummaryCard
                      icon={UserCheck}
                      label="Present"
                      value={presentCount}
                      iconClass="bg-emerald-50 text-emerald-600"
                    />

                    <SummaryCard
                      icon={X}
                      label="Absent"
                      value={absentCount}
                      iconClass="bg-red-50 text-red-600"
                    />

                    <SummaryCard
                      icon={Clock3}
                      label="Late"
                      value={lateCount}
                      iconClass="bg-amber-50 text-amber-600"
                    />
                  </div>

                  {/* Attendance Card */}

                  <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
                    <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <h2 className="text-sm font-bold text-slate-800">
                            Student attendance
                          </h2>

                          <p className="mt-1 text-xs text-slate-400">
                            {department} · {semester} · {date}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => markAll("Present")}
                            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                          >
                            <Check size={14} />
                            Mark all present
                          </button>

                          <button
                            type="button"
                            onClick={() => markAll("Absent")}
                            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-bold text-red-700 transition hover:bg-red-100"
                          >
                            <X size={14} />
                            Mark all absent
                          </button>
                        </div>
                      </div>

                      {/* Search */}

                      <div className="relative mt-5 max-w-md">
                        <Search
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search students..."
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                    </div>

                    {/* Students */}

                    {filteredStudents.length === 0 ? (
                      <div className="px-5 py-14 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                          <Users size={21} />
                        </div>

                        <p className="mt-4 text-sm font-bold text-slate-700">
                          No students found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try changing your search.
                        </p>
                      </div>
                    ) : (
                      <div>
                        {filteredStudents.map((student, index) => (
                          <StudentAttendanceRow
                            key={student.id}
                            student={student}
                            status={attendance[student.id]}
                            onChange={changeAttendance}
                            index={index}
                          />
                        ))}
                      </div>
                    )}

                    {/* Footer */}

                    <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-700">
                          Attendance status
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          {unmarkedCount > 0
                            ? `${unmarkedCount} student${
                                unmarkedCount === 1 ? "" : "s"
                              } still unmarked`
                            : "All students have been marked"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving || unmarkedCount > 0}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <CheckCircle2
                          size={16}
                          className={saving ? "animate-pulse" : ""}
                        />

                        {saving ? "Saving attendance..." : "Save Attendance"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* =================================================
                  EMPTY
              ================================================== */}

              {!loaded && (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <ClipboardCheck size={24} />
                  </div>

                  <h2 className="mt-5 text-base font-bold text-slate-800">
                    Ready to take attendance?
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-400">
                    Select a department, semester or class, and attendance date
                    above. Then click "Load Students" to begin.
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

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
  disabled,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 pr-11 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({ icon: Icon, label, value, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_24px_rgba(15,23,42,0.035)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={17} />
        </div>

        <span className="text-xl font-black tracking-tight text-slate-800">
          {value}
        </span>
      </div>

      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   STUDENT ROW
========================================================= */

function StudentAttendanceRow({ student, status, onChange, index }) {
  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`px-5 py-4 transition hover:bg-slate-50/70 sm:px-7 ${
        index !== 0 ? "border-t border-slate-100" : ""
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-blue-600">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800">
              {student.name}
            </p>

            <p className="mt-0.5 truncate text-[11px] text-slate-400">
              {student.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 lg:w-[330px]">
          <AttendanceButton
            label="Present"
            active={status === "Present"}
            onClick={() => onChange(student.id, "Present")}
            activeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
            icon={Check}
          />

          <AttendanceButton
            label="Absent"
            active={status === "Absent"}
            onClick={() => onChange(student.id, "Absent")}
            activeClass="border-red-200 bg-red-50 text-red-700"
            icon={X}
          />

          <AttendanceButton
            label="Late"
            active={status === "Late"}
            onClick={() => onChange(student.id, "Late")}
            activeClass="border-amber-200 bg-amber-50 text-amber-700"
            icon={Clock3}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ATTENDANCE BUTTON
========================================================= */

function AttendanceButton({ label, active, onClick, activeClass, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border text-[11px] font-bold transition ${
        active
          ? activeClass
          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}
