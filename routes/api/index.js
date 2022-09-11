const router = require("express").Router();
const userRoutes = require("./user-routes");
const pageRoutes = require("./page-routes");

router.use("/pages", pageRoutes);
router.use("/users", userRoutes);

module.exports = router;
