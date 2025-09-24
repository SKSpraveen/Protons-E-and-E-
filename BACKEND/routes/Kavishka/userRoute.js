const express = require("express");

const { signupUser, loginUser, google } = require("../../controller/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post('/google', google)


module.exports = router;
