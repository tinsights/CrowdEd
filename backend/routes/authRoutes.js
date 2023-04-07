const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require("../middleware/authMiddleware");

const { userLogin } = require("../controllers/authController");

// login and logout routes
router.post("/login", userLogin);

router.get("/logout", (req, res) => {
  console.log("logging out");
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;
