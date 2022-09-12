const router = require("express").Router();
const userRoutes = require("./user-routes");
const pageRoutes = require("./page-routes");
const reactionRoutes = require("./reaction-routes");

router.use("/reactions", reactionRoutes);
router.use("/pages", pageRoutes);
router.use("/users", userRoutes);

module.exports = router;
