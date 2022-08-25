const FishService = require("../Services/FishService");
const { validationResult } = require("express-validator");
const ErrorBody = require("../Utils/ErrorBody");
const { logger } = require("../Utils/Logger");
const ReadFishDataset = require("../Utils/ReadFishDataset");

function createFish(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in creating fish: ", errors);
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const reqBody = Object.assign(req.body, {
			nutritionalValue: JSON.stringify(req.body.nutritionalValue),
			regionalNames: JSON.stringify(req.body.regionalNames),
		});
		FishService.createFish(reqBody)
			.then((fish) => {
				res.status(200);
				res.json({
					messgae: "Fish Created",
					data: fish,
				});
			})
			.catch((error) => {
				logger.error("Error while creating fishes");
				console.log(error);
				next(new ErrorBody(500, "Internal Server Error"));
			});
	}
}

function getFishById(req, res, next) {
	FishService.getFish(req.params.fishId)
		.then((fish) => {
			res.status(200);
			res.json({ data: fish });
		})
		.catch((error) => {
			logger.error("Error while reading fish");
			console.log(error);
			next(new ErrorBody(500, "Internal Server Error"));
		});
}

function createFeedback(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in creating fish: ", errors);
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		FishService.createFeedback(req.body)
			.then((response) => {
				res.status(200);
				res.json({
					message: "Feedback Generated",
					data: response,
				});
			})
			.catch((error) => {
				logger.error("Error while creating feedback");
				console.log(error);
				next(new ErrorBody(500, "Internal Server Error"));
			});
	}
}

function listFeedback(_req, res, next) {
	FishService.listFeedback()
		.then((response) => {
			res.status(200);
			res.json({
				data: response,
			});
		})
		.catch((error) => {
			logger.error("Error while listing feedback");
			console.log(error);
			next(new ErrorBody(500, "Internal Server Error"));
		});
}

function createFishes(_req, res, next) {
	FishService.createFishes()
		.then((response) => {
			res.status(200);
			res.json({ data: response });
		})
		.catch((error) => {
			logger.error("Error while listing feedback");
			console.log(error);
			next(new ErrorBody(500, "Internal Server Error"));
		});
}

module.exports = {
	createFish: createFish,
	getFishById: getFishById,
	createFeedback: createFeedback,
	listFeedback: listFeedback,
	createFishes: createFishes,
};
