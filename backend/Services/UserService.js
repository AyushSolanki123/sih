const ErrorBody = require("../Utils/ErrorBody");
const { logger } = require("../Utils/Logger");
const mongoose = require("mongoose");
const User = require("../Models/User").model;
const PasswordResetToken = require("../Models/PasswordResetToken").model;

function listUsers() {
	return User.find({ role: "ADMIN" })
		.sort({ updatedAt: -1 })
		.select("-password");
}

function getUserByEmail(email) {
	return User.findOne({ email: email });
}

function addUser(userBody) {
	return User.create(userBody);
}

function getUserById(id) {
	return User.findById(id).select("-password");
}

function updateUser(id, reqBody) {
	return new Promise((resolve, reject) => {
		if (reqBody.password) {
			bcrypt
				.hash(reqBody.password, 10)
				.then((password) => {
					reqBody = Object.assign(reqBody, { password: password });
					return User.findByIdAndUpdate(
						id,
						{ $set: reqBody },
						{ new: true }
					).select("-password");
				})
				.then((user) => {
					if (user) {
						resolve(user);
					} else {
						logger.error("User doesn't Exist");
						reject(new ErrorBody(404, "User doesn't Exist"));
					}
				})
				.catch((error) => {
					console.log(error);
					logger.error("Internal Server Error");
					reject(new ErrorBody(500, "Server Error Occurred"));
				});
		} else {
			User.findByIdAndUpdate(id, { $set: reqBody }, { new: true })
				.select("-password")
				.then((user) => {
					if (user) {
						resolve(user);
					} else {
						logger.error("User doesn't Exist");
						reject(new ErrorBody(404, "User doesn't Exist"));
					}
				})
				.catch((error) => {
					console.log(error);
					logger.error("Internal Server Error");
					reject(new ErrorBody(500, "Server Error Occurred"));
				});
		}
	});
}

function createToken(tokenBody) {
	return PasswordResetToken.create(tokenBody);
}

function findAndUpdateToken(otp) {
	return PasswordResetToken.findOneAndUpdate(
		{ token: otp, isDeleted: false },
		{ $set: { tokenExpiry: 0, isDeleted: true } },
		{ new: true }
	);
}

module.exports = {
	getUserByEmail: getUserByEmail,
	addUser: addUser,
	getUserById: getUserById,
	updateUser: updateUser,
	createToken: createToken,
	listUsers: listUsers,
	findAndUpdateToken: findAndUpdateToken,
};
