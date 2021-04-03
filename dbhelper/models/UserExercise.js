const mongoose = require("mongoose");

const UserExerciseSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  target: {
    type: [String],
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const UserExercise = mongoose.model("userexercisedb", UserExerciseSchema);
module.exports = UserExercise;
