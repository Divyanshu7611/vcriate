const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
  signUp,
  login,
  changePassword,
} = require("../controllers/authController");

// login
router.post("/login", login);
// signup
router.post("/signup", signUp);
// change password
router.put("/changePassword", auth, changePassword);

module.exports = router;
