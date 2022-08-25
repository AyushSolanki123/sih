const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// controller
const fishController = require("../Controllers/FishController");
const { verifyToken } = require("../MiddleWare/VerifyToken");

router.post(
	"/create",
	[
		body("name").notEmpty(),
		body("speciesName").notEmpty(),
		body("price").notEmpty(),
		body("habitat").notEmpty(),
		body("nutritionalValue").isObject(),
		body("regionalNames").isObject(),
	],
	verifyToken,
	fishController.createFish
);

router.post("/create/all", fishController.createFishes);

router.get("/:fishId", verifyToken, fishController.getFishById);

router.post(
	"/feedback/create",
	[
		body("user").notEmpty(),
		body("feedback").notEmpty(),
		body("fish").notEmpty(),
	],
	verifyToken,
	fishController.createFeedback
);

router.get("/feedback/list", verifyToken, fishController.listFeedback);

module.exports = router;
