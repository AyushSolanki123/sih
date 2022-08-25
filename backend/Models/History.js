const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema(
	{
		latitude: {
			type: Schema.Types.Number,
			required: true,
		},
		longitude: {
			type: Schema.Types.Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const HistorySchema = new Schema(
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
		imageUrl: {
			type: Schema.Types.String,
			required: true,
		},
		location1: {
			type: LocationSchema,
			required: false,
		},
		location2: {
			type: LocationSchema,
			required: false,
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
	model: mongoose.model("History", HistorySchema),
	schema: HistorySchema,
};
