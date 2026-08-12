const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const markRoutes = require("./routes/markRoutes");

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());

// =====================================================
// ROUTES
// =====================================================

app.use("/api", userRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/marks", markRoutes);

// =====================================================
// ROOT
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "Student Management System API is running",
  });
});

// =====================================================
// DATABASE
// =====================================================

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 8007;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
