const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// controller
const userController = require("../Controllers/UserController");
const { verifyToken } = require("../MiddleWare/VerifyToken");

router.get("/", verifyToken, userController.listUsers);

router.put(
	"/",
	[body("userId").notEmpty()],
	verifyToken,
	userController.updateUserDetails
);

module.exports = router;
