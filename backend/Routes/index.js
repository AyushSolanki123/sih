const router = require("express").Router();

router.use("/api/v1/auth", require("./AuthRoutes"));
router.use("/api/v1/user", require("./UserRoutes"));
router.use("/api/v1/fish", require("./FishRoutes"));
router.use("/api/v1/history", require("./HistoryRoutes"));

router.get("/", (_req, res) => {
	res.redirect("/api/v1");
});

module.exports = router;
