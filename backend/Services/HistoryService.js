const { default: mongoose } = require("mongoose");
const History = require("../Models/History").model;

function createHistory(reqBody) {
	return History.create(reqBody);
}

function listHistory(userId) {
	return History.find({
		user: mongoose.Types.ObjectId(userId),
		isDeleted: false,
	})
		.populate("user", ["firstName", "lastName", "email"])
		.populate("fish");
}

function editHistory(id, reqBody) {
	return History.findByIdAndUpdate(
		mongoose.Types.ObjectId(id),
		{ $set: reqBody },
		{ new: true }
	);
}

function deleteHistory(id) {
	return History.findByIdAndUpdate(
		mongoose.Types.ObjectId(id),
		{ $set: { isDeleted: true } },
		{ new: true }
	);
}

module.exports = {
	createHistory: createHistory,
	listHistory: listHistory,
	editHistory: editHistory,
	deleteHistory: deleteHistory,
};
