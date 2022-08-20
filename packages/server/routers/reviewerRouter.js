const express = require("express");
const {
  getUnverified,
} = require("../controllers/reviewerController");
const router = express.Router();


router.get('/pending-verifications', getUnverified);

module.exports = router;