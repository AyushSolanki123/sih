const { default: mongoose } = require("mongoose");
const ErrorBody = require("../Utils/ErrorBody");
const Fish = require("../Models/Fish").model;
const Feedback = require("../Models/Feedback").model;
const ReadFishDataset = require("../Utils/ReadFishDataset");

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

function createFishes() {
	return new Promise((resolve, reject) => {
		let _promiseArray = [];

		ReadFishDataset()
			.then((response) => {
				response.forEach((fish) => {
					const data = {
						name: fish.Species,
						speciesName: fish.Species,
						nutritionalValue: JSON.stringify({
							calories: fish.Calories,
							carbohydrates: fish.Carbohydrates,
							fat: fish.Fat,
							protein: fish.Protein,
						}),
					};
					_promiseArray.push(createFish(data));
				});
				return Promise.all([..._promiseArray]);
			})
			.then((fishes) => {
				resolve(fishes);
			})
			.catch((error) => {
				reject(
					new ErrorBody(
						error.status || 500,
						error.message || "Internal Server Error"
					)
				);
			});
	});
}

module.exports = {
	createFish: createFish,
	createFishes: createFishes,
	getFish: getFish,
	createFeedback: createFeedback,
	listFeedback: listFeedback,
};
