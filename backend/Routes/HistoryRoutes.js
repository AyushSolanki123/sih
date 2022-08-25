const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// controller
const historyController = require("../Controllers/HistoryController");
const { verifyToken } = require("../MiddleWare/VerifyToken");

router.post(
	"/create",
	[
		body("user").notEmpty(),
		body("fish").notEmpty(),
		body("imageUrl").notEmpty(),
	],
	verifyToken,
	historyController.createHistory
);

router.get("/:userId", verifyToken, historyController.listHistory);

router.put("/:historyId", verifyToken, historyController.editHistory);

router.delete("/:historyId", verifyToken, historyController.deleteHistory);

module.exports = router;
