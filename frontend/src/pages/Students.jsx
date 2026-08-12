import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Search, Trash2, Edit, UserPlus, Users } from "lucide-react";
import { deleteStudent, getStudent } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getStudent();

      console.log("Students:", result.data.students);

      setStudents(result.data.students);
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteStudent(id);

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id),
      );
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to delete student.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      student.name?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.department?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#212529]">
                    Students
                  </h1>

                  <p className="mt-2 text-sm sm:text-base text-[#6C757D]">
                    Manage all students in the system.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/add-student")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#212529] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#343A40]"
                >
                  <UserPlus size={18} />
                  Add Student
                </button>
              </div>

              {/* Search & Filter */}
              <div className="mt-6 bg-white border border-[#DEE2E6] rounded-xl shadow-sm p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search
                      size={19}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D]"
                    />

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name, email or department..."
                      className="w-full rounded-lg border border-[#CED4DA] py-2.5 pl-10 pr-4 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="w-full md:w-48">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full rounded-lg border border-[#CED4DA] bg-white px-4 py-2.5 text-sm text-[#212529] outline-none transition focus:border-[#495057] focus:ring-2 focus:ring-[#DEE2E6]"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Student Count */}
              <div className="mt-6 flex items-center gap-2 text-sm text-[#6C757D]">
                <Users size={17} />
                <span>
                  Showing{" "}
                  <span className="font-semibold text-[#212529]">
                    {filteredStudents.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#212529]">
                    {students.length}
                  </span>{" "}
                  students
                </span>
              </div>

              {/* Students Table */}
              <div className="mt-4 bg-white border border-[#DEE2E6] rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                  <div className="p-10 text-center">
                    <p className="text-sm text-[#6C757D]">
                      Loading students...
                    </p>
                  </div>
                ) : filteredStudents.length === 0 ? (
                  <div className="p-10 text-center">
                    <Users size={40} className="mx-auto text-[#ADB5BD]" />

                    <h3 className="mt-3 text-lg font-semibold text-[#212529]">
                      No students found
                    </h3>

                    <p className="mt-1 text-sm text-[#6C757D]">
                      Try changing your search or filter.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                      <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6]">
                        <tr>
                          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6C757D]">
                            Student
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6C757D]">
                            Department
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6C757D]">
                            Semester
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6C757D]">
                            Status
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6C757D]">
                            Joined
                          </th>

                          <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#6C757D]">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-[#DEE2E6]">
                        {filteredStudents.map((student) => (
                          <tr
                            key={student._id}
                            className="hover:bg-[#F8F9FA] transition"
                          >
                            {/* Student */}
                            <td className="px-5 py-4">
                              <div>
                                <p className="font-medium text-[#212529]">
                                  {student.name}
                                </p>

                                <p className="text-sm text-[#6C757D] mt-1">
                                  {student.email}
                                </p>
                              </div>
                            </td>

                            {/* Department */}
                            <td className="px-5 py-4 text-sm text-[#343A40]">
                              {student.department}
                            </td>

                            {/* Semester */}
                            <td className="px-5 py-4 text-sm text-[#343A40]">
                              {student.semester}
                            </td>

                            {/* Status */}
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                  student.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {student.status || "Unknown"}
                              </span>
                            </td>

                            {/* Joined */}
                            <td className="px-5 py-4 text-sm text-[#6C757D]">
                              {formatDate(student.createdAt)}
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(`/students/edit/${student._id}`)
                                  }
                                  className="inline-flex items-center justify-center rounded-lg border border-[#CED4DA] p-2 text-[#495057] transition hover:bg-[#F8F9FA]"
                                  title="Edit Student"
                                >
                                  <Edit size={17} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDelete(student._id)}
                                  className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                                  title="Delete Student"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
