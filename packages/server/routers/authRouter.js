const express = require("express");
const {
  validateLoginForm,
  validateSignupForm,
} = require("../controllers/validateForm");
const router = express.Router();
const {
  handleLogin,
  attemptLogin,
  attemptRegister,
  logout,
} = require("../controllers/authController");

router.route("/login").get(handleLogin).post(validateLoginForm, attemptLogin);
router.post("/signup", validateSignupForm, attemptRegister);
router.post('/logout', logout);

module.exports = router;
