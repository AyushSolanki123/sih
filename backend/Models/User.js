const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		firstName: {
			type: Schema.Types.String,
			required: true,
		},
		lastName: {
			type: Schema.Types.String,
			required: false,
		},
		password: {
			type: Schema.Types.String,
			required: true,
		},
		email: {
			type: Schema.Types.String,
			required: true,
		},
		mobile: {
			type: Schema.Types.String,
			required: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = {
	model: mongoose.model("User", UserSchema),
};
