const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const { signUp, login, changePassword } = require("../controllers/Auth");

// login
router.post("/login", login);
// signup
router.post("/signup", signUp);
// change password
router.post("/changePassword", auth, changePassword);

module.exports = router;
