import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { getStudent } from "../../api/studentApi";
import { createMarks } from "../../api/markApi";

export default function AddMarks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState("");

  const [customResultType, setCustomResultType] = useState(false);

  const [formData, setFormData] = useState({
    course: "",
    resultType: "",
    totalMarks: "",
    obtainedMarks: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD STUDENTS
  // =====================================================

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoadingStudents(true);
        setError("");

        const result = await getStudent();

        console.log("Student API response:", result.data);

        const studentList = result?.data?.students || [];

        setStudents(studentList);
      } catch (err) {
        console.error("Failed to load students:", err);

        setError(
          err?.response?.data?.message ||
            "Failed to load students. Please try again.",
        );
      } finally {
        setLoadingStudents(false);
      }
    };

    loadStudents();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // RESULT TYPE
  // =====================================================

  const handleResultTypeChange = (e) => {
    const value = e.target.value;

    if (value === "Custom") {
      setCustomResultType(true);

      setFormData((prev) => ({
        ...prev,
        resultType: "",
      }));
    } else {
      setCustomResultType(false);

      setFormData((prev) => ({
        ...prev,
        resultType: value,
      }));
    }

    setError("");
    setSuccess("");
  };

  // =====================================================
  // SELECTED STUDENT
  // =====================================================

  const student = students.find((item) => item._id === selectedStudent);

  // =====================================================
  // PERCENTAGE
  // =====================================================

  const percentage =
    formData.totalMarks &&
    Number(formData.totalMarks) > 0 &&
    formData.obtainedMarks !== ""
      ? (
          (Number(formData.obtainedMarks) / Number(formData.totalMarks)) *
          100
        ).toFixed(1)
      : null;

  // =====================================================
  // GRADE
  // =====================================================

  const getGrade = (value) => {
    const mark = Number(value);

    if (mark >= 80) return "A+";
    if (mark >= 75) return "A";
    if (mark >= 70) return "A-";
    if (mark >= 65) return "B+";
    if (mark >= 60) return "B";
    if (mark >= 55) return "B-";
    if (mark >= 50) return "C+";
    if (mark >= 45) return "C";
    if (mark >= 40) return "D";

    return "F";
  };

  const grade = percentage !== null ? getGrade(percentage) : null;

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    if (!selectedStudent) {
      setError("Please select a student.");
      return;
    }

    if (!formData.course.trim()) {
      setError("Please enter the course.");
      return;
    }

    if (!formData.resultType.trim()) {
      setError("Please enter or select the result type.");
      return;
    }

    if (!formData.totalMarks) {
      setError("Please enter total marks.");
      return;
    }

    if (Number(formData.totalMarks) <= 0) {
      setError("Total marks must be greater than 0.");
      return;
    }

    if (formData.obtainedMarks === "") {
      setError("Please enter obtained marks.");
      return;
    }

    if (Number(formData.obtainedMarks) < 0) {
      setError("Obtained marks cannot be negative.");
      return;
    }

    if (Number(formData.obtainedMarks) > Number(formData.totalMarks)) {
      setError("Obtained marks cannot be greater than total marks.");
      return;
    }

    if (!formData.date) {
      setError("Please select the assessment date.");
      return;
    }

    if (!student) {
      setError("Selected student could not be found.");
      return;
    }

    // ---------------------------------------------------
    // DATA
    // ---------------------------------------------------

    const marksData = {
      studentId: selectedStudent,
      studentName: student.name,
      department: student.department,
      semester: student.semester,

      course: formData.course.trim(),

      resultType: formData.resultType.trim(),

      totalMarks: Number(formData.totalMarks),

      obtainedMarks: Number(formData.obtainedMarks),

      percentage: Number(percentage),

      grade,

      date: formData.date,
    };

    console.log("Sending marks to backend:", marksData);

    // ---------------------------------------------------
    // SAVE
    // ---------------------------------------------------

    try {
      setSaving(true);

      const response = await createMarks(marksData);

      console.log("Marks API response:", response.data);

      setSuccess("Marks saved successfully.");

      // Clear the form after successful save
      setSelectedStudent("");

      setCustomResultType(false);

      setFormData({
        course: "",
        resultType: "",
        totalMarks: "",
        obtainedMarks: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      console.error("Failed to save marks:", err);

      console.error("Backend error:", err?.response?.data);

      setError(
        err?.response?.data?.message ||
          "Failed to save marks. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setSelectedStudent("");

    setCustomResultType(false);

    setFormData({
      course: "",
      resultType: "",
      totalMarks: "",
      obtainedMarks: "",
      date: new Date().toISOString().split("T")[0],
    });

    setError("");
    setSuccess("");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">
              {/* HEADER */}

              <div className="mb-7">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                  Marks & Results
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Add Marks
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Record marks for a student based on an assessment, test,
                  examination, or custom result type.
                </p>
              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* FORM HEADER */}

                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      📝
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        Result Information
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Select a student and enter their result details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  {/* ERROR */}

                  {error && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                      <div className="mt-0.5 text-sm">⚠️</div>

                      <p className="text-sm font-medium text-red-600">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* SUCCESS */}

                  {success && (
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <div className="mt-0.5 text-sm">✓</div>

                      <p className="text-sm font-medium text-emerald-600">
                        {success}
                      </p>
                    </div>
                  )}

                  {/* STUDENT */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Student
                    </label>

                    <select
                      value={selectedStudent}
                      onChange={(e) => {
                        setSelectedStudent(e.target.value);
                        setError("");
                        setSuccess("");
                      }}
                      disabled={loadingStudents || saving}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="">
                        {loadingStudents
                          ? "Loading students..."
                          : students.length === 0
                            ? "No students available"
                            : "Select a student"}
                      </option>

                      {students.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name} — {item.email}
                        </option>
                      ))}
                    </select>

                    {!loadingStudents && students.length === 0 && (
                      <p className="mt-2 text-xs text-red-500">
                        No students were returned from the student API.
                      </p>
                    )}
                  </div>

                  {/* SELECTED STUDENT */}

                  {student && (
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-600">
                          {student.name
                            ?.split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-slate-800">
                            {student.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {student.email}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                              {student.department}
                            </span>

                            <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                              Class {student.semester}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COURSE + RESULT TYPE */}

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* COURSE */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Course
                      </label>

                      <input
                        type="text"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        disabled={saving}
                        placeholder="e.g. Bangla"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                      />
                    </div>

                    {/* RESULT TYPE */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Result Type
                      </label>

                      <select
                        value={
                          customResultType ? "Custom" : formData.resultType
                        }
                        onChange={handleResultTypeChange}
                        disabled={saving}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                      >
                        <option value="">Select result type</option>

                        <option value="Mid Class Test">Mid Class Test</option>

                        <option value="Quiz 1">Quiz 1</option>

                        <option value="Quiz 2">Quiz 2</option>

                        <option value="Assignment">Assignment</option>

                        <option value="Presentation">Presentation</option>

                        <option value="Lab Test">Lab Test</option>

                        <option value="Viva">Viva</option>

                        <option value="Midterm Exam">Midterm Exam</option>

                        <option value="Final Exam">Final Exam</option>

                        <option value="Other">Other</option>

                        <option value="Custom">
                          ✏️ Write Custom Result Type
                        </option>
                      </select>

                      {customResultType && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={formData.resultType}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                resultType: e.target.value,
                              }));

                              setError("");
                              setSuccess("");
                            }}
                            disabled={saving}
                            placeholder="e.g. Weekly Test, Chapter 3 Assessment..."
                            autoFocus
                            className="h-12 w-full rounded-xl border border-blue-200 bg-blue-50/50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                          />

                          <p className="mt-2 text-[11px] text-blue-500">
                            Write any name for this assessment or result.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* MARKS */}

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Total Marks
                      </label>

                      <input
                        type="number"
                        name="totalMarks"
                        value={formData.totalMarks}
                        onChange={handleChange}
                        disabled={saving}
                        min="1"
                        placeholder="e.g. 30"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Obtained Marks
                      </label>

                      <input
                        type="number"
                        name="obtainedMarks"
                        value={formData.obtainedMarks}
                        onChange={handleChange}
                        disabled={saving}
                        min="0"
                        max={formData.totalMarks || undefined}
                        placeholder="e.g. 26"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* DATE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Assessment Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      disabled={saving}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                    />
                  </div>

                  {/* RESULT PREVIEW */}

                  {percentage !== null && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                          Result Preview
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          This is how the result will be calculated.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="rounded-xl bg-white p-4">
                          <p className="text-[11px] font-medium text-slate-400">
                            Marks
                          </p>

                          <p className="mt-1 text-lg font-black text-slate-800">
                            {formData.obtainedMarks}

                            <span className="text-xs font-medium text-slate-400">
                              {" "}
                              / {formData.totalMarks}
                            </span>
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-4">
                          <p className="text-[11px] font-medium text-slate-400">
                            Percentage
                          </p>

                          <p className="mt-1 text-lg font-black text-blue-600">
                            {percentage}%
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-4">
                          <p className="text-[11px] font-medium text-slate-400">
                            Grade
                          </p>

                          <p
                            className={`mt-1 text-lg font-black ${
                              grade === "F"
                                ? "text-red-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {grade}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-4">
                          <p className="text-[11px] font-medium text-slate-400">
                            Type
                          </p>

                          <p className="mt-1 truncate text-sm font-bold text-slate-700">
                            {formData.resultType || "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIONS */}

                  <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={saving}
                      className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Clear
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="h-11 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save Marks"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
