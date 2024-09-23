const express = require("express");
const { signup, login, logout, authCheck } = require("../controller/authController");
const proctedRoute = require("../middleware/protectedRoute");

const router = express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.get("/authCheck", proctedRoute, authCheck)

module.exports = router; 