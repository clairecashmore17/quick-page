const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id for Get one, Update(put), delete at specified id
router.route("/:id").get(findUserById).put(updateUser).delete(deleteUser);

module.exports = router;
