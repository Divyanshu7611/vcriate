const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of four options (assuming MCQ with four options)
    validate: [arrayLimit, "{PATH} must have four options"],
  },
  correctAnswer: {
    type: String,
    required: true, 
  },
});

function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model("Question", questionSchema);