const bcrypt = require("bcrypt");
const UserService = require("../Services/UserService");
const { validationResult } = require("express-validator");
const ErrorBody = require("../Utils/ErrorBody");
const { logger } = require("../Utils/Logger");
const { generateAuthPairs, validateAuthToken } = require("../Utils/Helper");

function registerUser(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in register: ", errors);
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const { firstName, password, email } = req.body;
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
			.then((password) => {
				const _userBody = {
					firstName: firstName,
					...(req.body.lastName && { lastName: req.body.lastName }),
					password: password,
					email: email,
					...(req.body.mobile && { mobile: req.body.mobile }),
				};
				return UserService.addUser(_userBody);
			})
			.then((response) => {
				res.status(201);
				res.json({
					message: "User Registered Successfully",
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
		UserService.getUserByEmail(email)
			.then((user) => {
				if (user) {
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
				next(
					new ErrorBody(
						error.statusCode || 500,
						error.errorMessage || "Server error occurred"
					)
				);
			});
	}
}

function listUsers(req, res, next) {
	UserService.listUsers()
		.then((response) => {
			res.status(200);
			res.json({ data: response });
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

function getUserDetails(req, res, next) {
	const _userId = req.params.userId;
	UserService.getUserById(_userId)
		.then((response) => {
			res.status(200);
			res.json({ data: response });
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

function updateUserDetails(req, res, next) {
	const userId = req.params.userId;
	UserService.updateUser(userId, req.body)
		.then((updateResponse) => {
			logger.log(
				`User ${updateResponse.firstName} ${updateResponse.lastName} updated successfully`
			);
			res.status(200);
			res.json({
				message: "User Updated Successfully",
				data: updateResponse,
			});
		})
		.catch((error) => {
			logger.error("Unable to update the user at the moment");
			logger.error(JSON.stringify(error.message));
			next(
				new ErrorBody(
					error.statusCode || 500,
					error.errorMessage || "Server error occurred"
				)
			);
		});
}

module.exports = {
	loginUser: loginUser,
	listUsers: listUsers,
	registerUser: registerUser,
	refreshToken: refreshToken,
	getUserDetails: getUserDetails,
	updateUserDetails: updateUserDetails,
};
