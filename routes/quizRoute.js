const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const { auth } = require("../middleware/auth");

router.post("/", auth, quizController.createQuiz);

// get all quizzes
router.get("/", quizController.getAllQuizzes);

// get a specific quiz by ID
router.get("/:id", quizController.getQuizById);

module.exports = router;
