const { default: mongoose } = require("mongoose");
const History = require("../Models/History").model;

function createHistory(reqBody) {
	return History.create(reqBody);
}

function listHistory(userId) {
	return History.find({ user: mongoose.Types.ObjectId(userId) })
		.populate("user", ["firstName", "lastName", "email"])
		.populate("fish");
}

module.exports = {
	createHistory: createHistory,
	listHistory: listHistory,
};
