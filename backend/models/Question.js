const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} must have exactly 4 options'],
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
});

function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model('Question', QuestionSchema);

