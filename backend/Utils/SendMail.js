const nodemailer = require("nodemailer");

const sendEmail = (userEmail, token) => {
	return new Promise((resolve, reject) => {
		var transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		});
		var mailOptions = {
			from: process.env.EMAIL,
			to: userEmail,
			subject: "Reset Password for LMS",
			text: "this is your OTP for password reset " + token + ".",
		};
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				resolve("Email sent: " + info.response);
				console.log("Email sent: " + info.response);
			}
		});
	});
};

module.exports = sendEmail;
