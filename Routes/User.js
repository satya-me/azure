const express = require("express");
const router = express.Router();
const userCtrl = require("../Controllers/UserController");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/user", userCtrl.user);


module.exports = router;
