const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// controller
const userController = require("../Controllers/UserController");
const { verifyToken } = require("../MiddleWare/VerifyToken");

router.get("/", verifyToken, userController.listUsers);

module.exports = router;
