const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// controller
const authController = require("../Controllers/AuthController");

router.post(
	"/register",
	[
		body("firstName").notEmpty(),
		body("email").isEmail(),
		body("password").notEmpty(),
	],
	authController.registerUser
);

router.post(
	"/login",
	[body("email").isEmail(), body("password").notEmpty()],
	authController.loginUser
);

router.post(
	"/refreshToken",
	[body("refreshToken").notEmpty()],
	authController.refreshToken
);

router.post(
	"/login/status",
	[body("authToken").notEmpty()],
	authController.checkUserLoginStatus
);

router.post(
	"/sendResetToken",
	[body("email").isEmail()],
	authController.sendResetToken
);

router.post(
	"/forgotPassword",
	[body("email").isEmail(), body("otp").isNumeric()],
	authController.forgotPassword
);

module.exports = router;
