const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const Auth = require ("../middleware/auth.middleware")

// user display
router.get("/", Auth, userCtrl.getAllUsers);
router.get("/:id", Auth, userCtrl.userInfo);
router.put("/:id", Auth, userCtrl.updateUser);
router.delete("/:id", Auth, userCtrl.deleteUser);

module.exports = router;