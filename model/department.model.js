const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  subjects: {
    required: true,
    type: [
      {
        subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
        teacher: { type: mongoose.Types.ObjectId, ref: "Teacher" },
        semester: { type: String },
      },
    ],
  },
  routines: {
    type: [
      {
        semester: { type: String },
        routine: { type: mongoose.Types.ObjectId, ref: "Routine" },
      },
    ],
  },
});

module.exports = mongoose.model("Department", departmentSchema);
