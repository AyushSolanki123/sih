const ErrorBody = require("../Utils/ErrorBody");
const { validateAuthToken } = require("../Utils/Helper");

function verifyToken(req, res, next) {
	const _authToken = req.headers.authorization;
	if (_authToken) {
		validateAuthToken(_authToken)
			.then((response) => {
				req.phoneNumber = response.phoneNumber;
				req.id = response.id;
				next();
			})
			.catch((error) => {
				next(
					new ErrorBody(
						401,
						error.message || "No auth token found in the request"
					)
				);
			});
	} else {
		next(new ErrorBody(401, "No auth token found in the request"));
	}
}

module.exports = {
	verifyToken: verifyToken,
};
