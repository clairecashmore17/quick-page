const {
  addReaction,
  removeReaction,
} = require("../../controllers/reaction-controller");

const router = require("express").Router();

router.route("/:pageId").post(addReaction);

router.route("/:pageId/:reactionId").delete(removeReaction);

module.exports = router;
