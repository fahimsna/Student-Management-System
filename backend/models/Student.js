let mongoose = require("mongoose");
let studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
});
let student = mongoose.model("Students", studentSchema);
module.exports = student;
