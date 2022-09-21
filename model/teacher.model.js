const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  workload: {
    required: true,
    type: Number,
  },
  type: {
    required: true,
    type: String,
    enum: ["full-time", "part-time"],
    default: "full-time",
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  initial: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
