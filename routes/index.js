const router = require("express").Router();
const apiRoutes = require("./api");

//routes to api
router.use("/api", apiRoutes);

//router with no endpoints
router.use((req, res) => {
  res.status(404).send("<h1>I'm sorry, you seem to be lost, 404 error</h1>");
});

module.exports = router;
