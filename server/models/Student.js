
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  technicalSkills: {
    type: [String],
    required: true
  },
  aptitudeScore: {
    type: Number,
    required: true
  },
  communicationSkills: {
    type: String,
    required: true
  },
  placementReadiness: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
