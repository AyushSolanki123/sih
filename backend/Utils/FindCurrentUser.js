const jwt = require("jsonwebtoken");
const ErrorBody = require("./ErrorBody");

const findUser = (authorization) => {
	let result;
	const options = {
		expiresIn: process.env.AUTH_TOKEN_VALIDITY,
	};
	const secret = process.env.JWT_KEY;
	try {
		// verify makes sure that the token hasn't expired and has been issued by us
		result = jwt.verify(authorization, secret, options);
		return result;
	} catch (err) {
		throw new ErrorBody(
			err.statusCode || 500,
			err.errorMessage || "Server error occurred"
		);
	}
};

module.exports = findUser;
