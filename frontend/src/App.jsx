import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import Students from "./pages/Students";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";
import Profile from "./pages/Profile";

import TakeAttendance from "./pages/TakeAttendance";
import AttendanceRecord from "./pages/attendance/AttendanceRecord";
import AttendanceReport from "./pages/attendance/AttendanceReport";

import AddMarks from "./pages/marks/AddMarks";
import MarksRecords from "./pages/marks/MarksRecords";
import MarksReport from "./pages/marks/MarksReport";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================================
            PUBLIC ROUTES
        ====================================================== */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =====================================================
            DASHBOARD
        ====================================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            STUDENTS
        ====================================================== */}

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students/:id"
          element={
            <ProtectedRoute>
              <StudentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-student"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students/edit/:id"
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            PROFILE
        ====================================================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            ATTENDANCE
        ====================================================== */}

        <Route
          path="/attendance/take"
          element={
            <ProtectedRoute>
              <TakeAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/records"
          element={
            <ProtectedRoute>
              <AttendanceRecord />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/report"
          element={
            <ProtectedRoute>
              <AttendanceReport />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            MARKS
        ====================================================== */}

        <Route
          path="/marks/add"
          element={
            <ProtectedRoute>
              <AddMarks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks/records"
          element={
            <ProtectedRoute>
              <MarksRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks/report"
          element={
            <ProtectedRoute>
              <MarksReport />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            FALLBACK
        ====================================================== */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
