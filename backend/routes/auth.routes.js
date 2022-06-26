const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const checkPassword = require('../middleware/password-validator')

// auth
router.post("/signup", checkPassword, authCtrl.signUp);
router.post("/login", authCtrl.logIn);
router.get("/logout", authCtrl.logOut);

module.exports = router;