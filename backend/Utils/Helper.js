const jwt = require("jsonwebtoken");
const { env } = require("../env");

function generateAuthPairs(payload, refreshPayload) {
	return new Promise((resolve, reject) => {
		const jwtKey = env.jwtKey;
		const refreshKey = env.refreshKey;
		const authToken = jwt.sign(payload, jwtKey, {
			expiresIn: env.tokenValidity,
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
		const jwtKey = env.jwtKey;
		const refreshKey = env.refreshKey;
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
