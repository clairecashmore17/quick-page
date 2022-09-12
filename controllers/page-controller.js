const { User, Page } = require("../models");

const pageController = {
  // find page with provided code
  findPageWithCode({ params, res }) {
    Page.findOne({ entry_code: params.code })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .then((dbPageData) => {
        if (!dbPageData) {
          res.status(404).json({ message: "No page found with this code!" });
          return;
        }
        res.json(dbPageData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create a page
  createPage({ params, body }, res) {
    Page.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          {
            _id: params.userId,
          },
          {
            $push: { pages: _id },
          },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = pageController;
