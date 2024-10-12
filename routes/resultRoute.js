const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");
const { auth } = require("../middleware/auth");
const apiLimiter = require("../middleware/rateLimiter");

router.use(apiLimiter);
router.post("/", resultController.submitResult);

// get results for a specific user
router.get("/user/:userId", auth, resultController.getResultsByUserId);

// get results for a specific quiz
router.get("/quiz/:quizId", auth, resultController.getResultsByQuizId);

module.exports = router;
