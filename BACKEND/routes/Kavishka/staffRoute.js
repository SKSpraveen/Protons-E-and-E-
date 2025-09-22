const express = require("express");

const { signupUser, loginUser } = require("../../controller/staffController");

const router = express.Router();

router.post("/Stafflogin", loginUser);
router.post("/Staffsignup", signupUser);


module.exports = router;
