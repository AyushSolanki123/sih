const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		fish: {
			type: Schema.Types.ObjectId,
			ref: "Fish",
			required: true,
		},
		feedback: {
			type: Schema.Types.String,
			required: true,
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
	model: mongoose.model("Feedback", FeedbackSchema),
	schema: FeedbackSchema,
};
