const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    resultType: {
      type: String,
      required: true,
      trim: true,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    obtainedMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    percentage: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Marks", marksSchema);
