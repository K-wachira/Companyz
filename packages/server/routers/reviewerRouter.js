const express = require("express");
const {
  getUnverified,
  verify
} = require("../controllers/reviewerController");
const router = express.Router();


router.get('/pending-verifications', getUnverified);
router.post('/verifying', verify);


module.exports = router;