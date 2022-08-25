const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// controller
const userController = require("../Controllers/UserController");
const { verifyToken } = require("../MiddleWare/VerifyToken");

router.get("/", verifyToken, userController.listUsers);

router.get("/:userId", verifyToken, userController.getUserDetails);

router.post(
	"/register",
	[
		body("firstName").notEmpty(),
		body("email").isEmail(),
		body("password").notEmpty(),
	],
	userController.registerUser
);

router.post(
	"/login",
	[body("email").isEmail(), body("password").notEmpty()],
	userController.loginUser
);

router.post(
	"/refreshToken",
	[body("refreshToken").notEmpty()],
	userController.refreshToken
);

router.put("/:userId", verifyToken, userController.updateUserDetails);

module.exports = router;
