const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  targets: {
    type: [String],
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  MET: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
});

const Exercise = mongoose.model("exercisedb", ExerciseSchema);
module.exports = Exercise;
