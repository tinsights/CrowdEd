const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require("../middleware/authMiddleware");

const { getUserById, getAllUsers, addUser, updateUser, deleteUser } = require("../controllers/userController");

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
