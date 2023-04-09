const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken, checkToken } = require("../middleware/authMiddleware");

const { userLogin } = require("../controllers/authController");
const { getUserById } = require("../controllers/userController");

// login and logout routes
router.post("/login", userLogin);

router.get("/logout", (req, res) => {
  console.log("logging out");
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out" });
});

router.get("/checkUser", authenticateToken, (req, res) => {
  req.params.id = req.user.id;
  getUserById(req, res);
});

router.get("/checkToken", checkToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

module.exports = router;
