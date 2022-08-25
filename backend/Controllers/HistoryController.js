const HistoryService = require("../Services/HistoryService");
const { validationResult } = require("express-validator");
const ErrorBody = require("../Utils/ErrorBody");
const { logger } = require("../Utils/Logger");

function createHistory(req, res, next) {
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in creating history: ", errors);
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		HistoryService.createHistory(req.body)
			.then((response) => {
				res.status(200);
				res.json({
					message: "History created successfully",
					data: response,
				});
			})
			.catch((error) => {
				logger.error("Error while creating history");
				console.log(error);
				next(new ErrorBody(500, "Internal Server Error"));
			});
	}
}

function listHistory(req, res, next) {
	const userId = req.params.userId;

	HistoryService.listHistory(userId)
		.then((response) => {
			res.status(200);
			res.json({ data: response });
		})
		.catch((error) => {
			logger.error("Error while listing history");
			console.log(error);
			next(new ErrorBody(500, "Internal Server Error"));
		});
}

module.exports = {
	createHistory: createHistory,
	listHistory: listHistory,
};
