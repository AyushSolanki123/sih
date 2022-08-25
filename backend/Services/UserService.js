const ErrorBody = require("../Utils/ErrorBody");
const { logger } = require("../Utils/Logger");
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
	return User.findByIdAndUpdate(id, { $set: reqBody }, { new: true }).select(
		"-password"
	);
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
