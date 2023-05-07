const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: Number,
    required: true,
  },
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = { Quiz, Question };
