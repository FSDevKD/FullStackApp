const express = require("express");
const router = express.Router();
const { Quiz, Question } = require("../models/Quiz");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", (req, res) => res.render("index"));
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const quizzes = await Quiz.find().lean();
  res.render('dashboard', { quizzes, user: req.user});
});

router.post('/quiz', ensureAuthenticated, async (req, res) =>{
    const {title} = req.body;
    const newQuiz = new Quiz({title});
    await newQuiz.save();
    res.redirect('/dashboard')
});

router.post('/quiz/:quizId/question', ensureAuthenticated, async (req, res) => {
  const { questionText, 'options[]': options, correctAnswer } = req.body;
  console.log('questionText:', questionText);
  console.log('options:', options);
  console.log('correctAnswer:', correctAnswer);
  
  const question = new Question({ questionText, options, correctAnswer});
  await Quiz.findByIdAndUpdate(req.params.quizId, {$push: {questions: question}});
  res.redirect('/dashboard');
});


router.post('/quiz/:quizId/delete', ensureAuthenticated, async (req, res) => {
 await Quiz.findByIdAndDelete(req.params.quizId)
 res.redirect('/dashboard')
});

router.get('/quiz/:quizId/edit', ensureAuthenticated, async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId).lean();
  res.render('edit', { quiz });
});




module.exports = router;
