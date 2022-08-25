const router = require("express").Router();

router.use("/api/v1/auth", require("./AuthRoutes"));
router.use("/api/v1/user", require("./UserRoutes"));

router.get("/", (req, res) => {
	res.redirect("/api/v1");
});

module.exports = router;
