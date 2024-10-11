const express = require("express");
const router = express.Router();
const Question = require("../controllers/questionController");
const { auth } = require("../middleware/auth");

// create questions
router.post("/:quizId", auth, Question.addQuestionsToQuiz);

// get all questions for a specific quiz
router.get("/:quizId", Question.getQuestionsByQuizId);

module.exports = router;
