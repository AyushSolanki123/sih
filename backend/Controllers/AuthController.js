const bcrypt = require("bcrypt");
const UserService = require("../Services/UserService");
const { validationResult } = require("express-validator");
const ErrorBody = require("../Utils/ErrorBody");
const moment = require("moment");
const otpGenerator = require("otp-generator");
const { logger } = require("../Utils/Logger");
const { generateAuthPairs, validateAuthToken } = require("../Utils/Helper");
const checkLoginStatus = require("../Utils/CheckLoginStatus");
const sendEmail = require("../Utils/SendMail");

function registerUser(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in register: ", errors);
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const { firstName, password, email } = req.body;
		let user;
		UserService.getUserByEmail(email)
			.then((userResponse) => {
				if (userResponse) {
					throw new ErrorBody(
						401,
						"The user already exists in the system, please login"
					);
				} else {
					return bcrypt.hash(password, 10);
				}
			})
			.then((response) => {
				const _userBody = {
					firstName: firstName,
					...(req.body.lastName && { lastName: req.body.lastName }),
					password: response,
					email: email,
					...(req.body.role && { role: req.body.role }),
				};
				return UserService.addUser(_userBody);
			})
			.then((response) => {
				user = response;
				const authPayload = {
					email: email,
					password: password,
					type: "auth",
				};
				const refreshPayload = {
					email: email,
					password: password,
					type: "refresh",
				};
				return generateAuthPairs(authPayload, refreshPayload);
			})
			.then((tokenPair) => {
				res.status(200);
				res.json({
					message: "Registration Successful",
					tokenPair: tokenPair,
					user: user,
				});
			})
			.catch((error) => {
				logger.error(
					"Failed while registering the user" +
						JSON.stringify(error.message)
				);
				next(
					new ErrorBody(
						error.statusCode || 500,
						error.errorMessage || "Server error occurred"
					)
				);
			});
	}
}

function loginUser(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in logging in: ", JSON.stringify(errors));
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const { email, password } = req.body;
		let _user;
		UserService.getUserByEmail(email)
			.then((user) => {
				if (user) {
					_user = user;
					return bcrypt.compare(password, user.password);
				} else {
					throw new ErrorBody(
						401,
						"The user Doesnt exists in the system, please Register"
					);
				}
			})
			.then((response) => {
				if (response) {
					const authPayload = {
						email: email,
						password: password,
						type: "auth",
					};
					const refreshPayload = {
						email: email,
						password: password,
						type: "refresh",
					};
					return generateAuthPairs(authPayload, refreshPayload);
				} else {
					throw new ErrorBody(
						401,
						"Wrong password entered, please retry"
					);
				}
			})
			.then((tokenPair) => {
				res.status(200);
				res.json({
					message: "Login Successful",
					token: tokenPair,
					user: _user,
				});
			})
			.catch((err) => {
				logger.error(
					"Failed while registering the user" +
						JSON.stringify(err.message)
				);
				next(
					new ErrorBody(
						err.statusCode || 500,
						err.errorMessage || "Server error occurred"
					)
				);
			});
	}
}

function refreshToken(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in refresh token request body");
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const refreshToken = req.body.refreshToken;
		validateAuthToken(refreshToken, 1)
			.then((response) => {
				console.log("Refresh token response");
				console.log(response);
				if (response.iat) {
					delete response.iat;
				}
				return generateAuthPairs(response, response);
			})
			.then((tokenPair) => {
				res.status(200);
				res.json({
					authToken: tokenPair.authToken,
				});
			})
			.catch((error) => {
				logger.error("Error in refresh token");
				logger.error(JSON.stringify(error));
				next(
					new ErrorBody(
						error.statusCode || 500,
						error.errorMessage || "Server error occurred"
					)
				);
			});
	}
}

function checkUserLoginStatus(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in refresh token request body");
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const authToken = req.body.authToken;
		const result = checkLoginStatus(authToken);
		res.send({
			status: result,
		});
	}
}

function sendResetToken(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in logging in: ", JSON.stringify(errors));
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const email = req.body.email;
		UserService.getUserByEmail(email)
			.then((user) => {
				if (!user) {
					logger.info("User doesn't exist");
					next(new ErrorBody(404, "User Doesn't Exist"));
				} else {
					const _otp = otpGenerator.generate(6, {
						specialChars: false,
						upperCaseAlphabets: false,
						lowerCaseAlphabets: false,
					});
					const _otpValidMoment = moment();
					_otpValidMoment.add(1, "day");
					const tokenBody = {
						token: _otp,
						tokenExpiry: _otpValidMoment.valueOf(),
					};
					return UserService.createToken(tokenBody);
				}
			})
			.then((token) => {
				return sendEmail(email, token.token);
			})
			.then((response) => {
				res.status(200);
				res.json({
					message: response,
				});
			})
			.catch((error) => {
				console.log(error);
				next(
					new ErrorBody(
						error.statusCode || 500,
						error.errorMessage || "Server error occurred"
					)
				);
			});
	}
}

function forgotPassword(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in logging in: ", JSON.stringify(errors));
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const { email, otp } = req.body;
		let _user = null;
		UserService.getUserByEmail(email)
			.then((user) => {
				if (!user) {
					logger.info("User doesn't exist");
					next(new ErrorBody(404, "User Doesn't Exist"));
				} else {
					_user = user._id;
					return UserService.findAndUpdateToken(otp);
				}
			})
			.then((token) => {
				if (!token) {
					logger.error("Token doesn't exist");
					next(new ErrorBody(404, "Token doesn't exist"));
				} else {
					const authPayload = {
						email: email,
						type: "auth",
					};
					const refreshPayload = {
						email: email,
						type: "refresh",
					};
					return generateAuthPairs(authPayload, refreshPayload);
				}
			})
			.then((tokenPair) => {
				res.status(200);
				res.json({
					tokenPair: tokenPair,
					userId: _user,
				});
			})
			.catch((error) => {
				next(
					new ErrorBody(
						error.statusCode || 500,
						error.errorMessage || "Server error occurred"
					)
				);
			});
	}
}

module.exports = {
	loginUser: loginUser,
	registerUser: registerUser,
	refreshToken: refreshToken,
	checkUserLoginStatus: checkUserLoginStatus,
	sendResetToken: sendResetToken,
	forgotPassword: forgotPassword,
};
