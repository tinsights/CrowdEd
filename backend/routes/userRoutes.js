const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  getUserById,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  createSkillForUser,
  userLogin,
} = require("../controllers/userController");

router.get("/protected", authenticateToken, (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: "You are authorized" });
});
router.get("/logout", (req, res) => {
  console.log("logging out");
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out" });
});

router.route("/").get(getUsers).post(addUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.get("/:id/skills", (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  // read users, get skills for user with :id
  jsonfile
    .readFile(usersFile)
    .then((users) => {
      const userToQuery = users[users.findIndex((user) => user._id === userID)];
      res.status(200).json(userToQuery.skills);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      throw new Error(err);
    });
});

router.post("/:id/skills", createSkillForUser);

router.post("/login", userLogin);

router.put("/:id/skills/:skill_id", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: `Update skill ${req.params.skill_id} for user ${req.params.id}` });
});

router.delete("/:id/skills/:skill_id", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: `Delete skill ${req.params.skill_id} for user ${req.params.id}` });
});

module.exports = router;
