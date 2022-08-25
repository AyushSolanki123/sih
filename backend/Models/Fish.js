const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FishSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: true,
		},
		speciesName: {
			type: Schema.Types.String,
			required: true,
		},
		price: {
			type: Schema.Types.String,
			required: true,
		},
		habitat: {
			type: Schema.Types.String,
			required: true,
		},
		nutritionalValue: {
			type: Schema.Types.String,
			required: false,
			default: "",
		},
		regionalNames: {
			type: Schema.Types.String,
			required: true,
		},
		isEdible: {
			type: Schema.Types.Boolean,
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
	model: mongoose.model("Fish", FishSchema),
	schema: FishSchema,
};
