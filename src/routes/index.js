const express = require("express");
const router = express.Router();
const { login, checkUserLogin, logout } = require("../controllers/auth.controller");

router.post("/login", login);
router.get("/check-user", checkUserLogin);
router.post("/logout", logout);

module.exports = router;