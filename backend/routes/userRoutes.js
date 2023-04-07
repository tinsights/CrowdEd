const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require("../middleware/authMiddleware");

const { getUserById, getAllUsers, addUser, updateUser, deleteUser } = require("../controllers/userController");

router.get("/protected", authenticateToken, (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: "You are authorized" });
});
router.get("/logout", (req, res) => {
  console.log("logging out");
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out" });
});

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
