const express = require("express");
const router = express.Router();
const { getUserById, getUsers, addUser, updateUser, deleteUser } = require("../controllers/userController");

router.route("/").get(getUsers).post(addUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
