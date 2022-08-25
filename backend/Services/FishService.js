const { default: mongoose } = require("mongoose");
const Fish = require("../Models/Fish").model;
const Feedback = require("../Models/Feedback").model;

function createFish(reqBody) {
	return Fish.create(reqBody);
}

function getFish(fishId) {
	return Fish.findById(mongoose.Types.ObjectId(fishId));
}

function createFeedback(reqBody) {
	return Feedback.create(reqBody);
}

function listFeedback() {
	return Feedback.find({ isDeleted: false })
		.populate("user", ["firstName", "lastName", "email"])
		.populate("fish");
}

module.exports = {
	createFish: createFish,
	getFish: getFish,
	createFeedback: createFeedback,
	listFeedback: listFeedback,
};
