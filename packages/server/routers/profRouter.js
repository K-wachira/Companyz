const express = require("express");
const router = express.Router();
const {
    getProfileData,
    updateProfileData
} = require("../controllers/profileController");

router.post("/view", getProfileData)
router.post("/edit" , updateProfileData);

module.exports = router;
