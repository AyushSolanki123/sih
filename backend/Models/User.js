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
		role: {
			type: Schema.Types.String,
			enum: ["USER", "ADMIN"],
			required: true,
			default: "USER",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = {
	model: mongoose.model("User", UserSchema),
	schema: UserSchema,
};
