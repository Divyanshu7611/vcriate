const Result = require("../models/Result");
const Quiz = require("../models/Quiz");

exports.submitResult = async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;

    // Validation
    if (!userId || !quizId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;
    const answerResults = answers.map((answer) => {
      const question = quiz.questions.find((q) =>
        q._id.equals(answer.questionId)
      );
      const isCorrect =
        question && question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) score += 1;
      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
      };
    });

    const result = new Result({
      userId,
      quizId,
      score,
      answers: answerResults,
    });
    await result.save();

    res.status(201).json({ result, score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get results by user ID
exports.getResultsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId }).populate("quizId");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get results by quiz ID
exports.getResultsByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;
    const results = await Result.find({ quizId }).populate("userId");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
