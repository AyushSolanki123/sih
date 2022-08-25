const jwt = require("jsonwebtoken");

function generateAuthPairs(payload, refreshPayload) {
	return new Promise((resolve, reject) => {
		const jwtKey = process.env.JWT_KEY;
		const refreshKey = process.env.REFRESH_KEY;
		const authToken = jwt.sign(payload, jwtKey, {
			expiresIn: process.env.AUTH_TOKEN_VALIDITY,
		});
		const refreshToken = jwt.sign(refreshPayload, refreshKey);
		resolve({
			authToken: authToken,
			refreshToken: refreshToken,
		});
	});
}

function validateAuthToken(token, tokenType = 0) {
	// 0 for auth token , 1 for refresh token
	return new Promise(function (resolve, reject) {
		const jwtKey = process.env.JWT_KEY;
		const refreshKey = process.env.REFRESH_KEY;
		jwt.verify(
			token,
			tokenType === 0 ? jwtKey : refreshKey,
			(err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			}
		);
	});
}

module.exports = {
	generateAuthPairs: generateAuthPairs,
	validateAuthToken: validateAuthToken,
};
