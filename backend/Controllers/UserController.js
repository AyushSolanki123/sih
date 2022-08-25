const UserService = require("../Services/UserService");
const ErrorBody = require("../Utils/ErrorBody");
const { logger } = require("../Utils/Logger");
const { validationResult } = require("express-validator");

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
	const { errors } = validationResult(req);
	if (errors.length > 0) {
		logger.error("Error in register: ", errors);
		next(new ErrorBody(400, "Invalid values in the form"));
	} else {
		const { id, ...reqBody } = req.body;
		UserService.updateUser(id, reqBody)
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
				console.log(error);
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
}

module.exports = {
	listUsers: listUsers,
	getUserDetails: getUserDetails,
	updateUserDetails: updateUserDetails,
};
