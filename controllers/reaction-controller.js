const { User, Reaction, Page } = require("../models");

const reactionController = {
  //add reaction to Reaction
  addReaction({ params, body }, res) {
    Reaction.create(body)
      .then(({ _id }) => {
        return Page.findOneAndUpdate(
          {
            _id: params.pageId,
          },
          {
            $push: { reactions: _id },
          },
          { new: true }
        );
      })
      .then((dbPageData) => {
        if (!dbPageData) {
          res.status(404).json({ message: "No page found witht this id" });
          return;
        }
        res.json(dbPageData);
      })
      .catch((err) => res.json(err));
  },
  //remove a reaction
  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ reactionId: params.reactionId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res
            .status(404)
            .json({ message: "No reaction found with this id!" });
        }
        return Page.findOneAndUpdate(
          {
            _id: params.pageId,
          },
          {
            $pull: { reactions: params.reactionId },
          },
          { new: true }
        );
      })
      .then((dbPageData) => {
        if (!dbPageData) {
          res.status(404).json({ message: "No page found with this id!" });
          return;
        }
        console.log("+++++++++" + dbPageData);
        res.json(dbPageData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = reactionController;
