const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PasswordResetTokenSchema = new Schema(
	{
		token: {
			type: Schema.Types.Number,
			required: true,
		},
		tokenExpiry: {
			type: Schema.Types.Number,
			required: true,
			default: 300000,
		},
		isDeleted: {
			type: Schema.Types.Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = {
	model: mongoose.model("PasswordResetToken", PasswordResetTokenSchema),
	schema: PasswordResetTokenSchema,
};
