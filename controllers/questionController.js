const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// Add questions to a quiz
exports.addQuestionsToQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questions } = req.body; // Array of questions

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const newQuestions = await Question.insertMany(questions);
    quiz.questions.push(...newQuestions.map((q) => q._id));
    await quiz.save();

    res.status(201).json(newQuestions);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all questions of a quiz
exports.getQuestionsByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate("questions");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz.questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
