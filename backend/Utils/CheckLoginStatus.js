const jwt = require("jsonwebtoken");

const checkLoginStatus = (authToken) => {
	let result;
	const options = {
		expiresIn: process.env.AUTH_TOKEN_VALIDITY,
	};
	const secret = process.env.JWT_KEY;
	try {
		result = jwt.verify(authToken, secret, options);
		if (result) return true;
	} catch (err) {
		return false;
	}
};

module.exports = checkLoginStatus;
