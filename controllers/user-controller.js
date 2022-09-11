const { User, Page } = require("../models");

const userController = {
  //all of our routing functions for a user

  //find all users
  getAllUsers(req, res) {
    User.find({})
      // using populate to see all of our joined results on insomnia
      .populate({
        path: "pages",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //find one user
  findUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "pages",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        //If there is no user found with this _id...
        if (!dbUserData) {
          res.status(404).json({ message: "There is no user with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //post a user(create a user)
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  //Update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      .then((dbUserData) => {
        //if no user found with this id
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //Delete a user
  deleteUser({ params }, res) {
    Page.deleteMany({ userId: params.id })
      .then(() => {
        User.findOneAndDelete({ _id: params.id }).then((dbUserData) => {
          //if no user found with id
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
