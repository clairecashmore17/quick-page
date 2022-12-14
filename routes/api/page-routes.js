const router = require("express").Router();
const {
  createPage,
  findPageWithCode,
  addReaction,
  removeReaction,
} = require("../../controllers/page-controller");

router.route("/:userId").post(createPage);

router.route("/:code").get(findPageWithCode);

module.exports = router;
