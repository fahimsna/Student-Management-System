const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      required: true,
    },
  },
  { _id: false },
);

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: String,
      required: true,
      trim: true,
    },

    attendance: {
      type: [attendanceRecordSchema],
      required: true,
      validate: {
        validator: (records) => records.length > 0,
        message: "At least one attendance record is required.",
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

attendanceSchema.index(
  { date: 1, department: 1, semester: 1 },
  { unique: true },
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
